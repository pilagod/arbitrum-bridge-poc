import { BigNumber, ethers } from "ethers";
import {
  ArbRetryableTx,
  ArbSys,
  EthTestToken,
  L1ERC20Gateway,
  Outbox,
} from "@contract";
import { arbSigner, ethSigner, getBridge } from "@network";
import logger from "./logger";
import { L1Message, L1MessageStatus } from "./model/L1Message";
import { L2Message, L2MessageStatus } from "./model/L2Message";
import L1MessageRepository from "./repository/L1MessageRepository";
import L2MessageRepository from "./repository/L2MessageRepository";

const l1MsgRepo = new L1MessageRepository();
const l2MsgRepo = new L2MessageRepository();

export default async function watcher() {
  // L1
  L1ERC20Gateway.on("OutboundTransferInitiated", l1DepositMessageHandler);
  Outbox.on("OutboxEntryCreated", l2MessageExecutableHandler);
  Outbox.on("OutBoxTransactionExecuted", deposit);

  // L2
  ArbRetryableTx.on("Redeemed", l1MessageRedeemedHandler);
  ArbRetryableTx.on("TicketCreated", l1MessageRetryableHandler);
  ArbSys.on("L2ToL1Transaction", l2WithdrawMessageHandler);

  logger.info("Watcher started");

  // initialize first deposit
  const l1MsgRepo = new L1MessageRepository();
  const l1Msg = await l1MsgRepo.find();
  if (!l1Msg) {
    logger.info("Initialize first deposit");
    await deposit();
  }
}

async function deposit() {
  logger.info(`Deposit 0.1 TKN from L1`);
  const bridge = await getBridge();
  await bridge.deposit(EthTestToken.address, ethers.utils.parseEther("0.1"));
}

async function withdraw() {
  logger.info("Withdraw 0.1 TKN from L2");
  const bridge = await getBridge();
  await bridge.withdrawERC20(
    EthTestToken.address,
    ethers.utils.parseEther("0.1")
  );
}

async function l1DepositMessageHandler(
  tokenAddr: string,
  from: string,
  to: string,
  msgId: BigNumber,
  amount: BigNumber,
  msgData: string
) {
  if (from != ethSigner.address) {
    return;
  }
  const bridge = await getBridge();
  const l2TicketId = await bridge.calculateL2RetryableTransactionHash(msgId);
  logger.info("Deposit message is sent", {
    from,
    to,
    amount: ethers.utils.formatEther(amount),
    msgId: msgId.toString(),
    msgData,
    l2TicketId,
  });
  await l1MsgRepo.create(
    new L1Message(msgId, msgData, l2TicketId, L1MessageStatus.Sent)
  );
}

async function l1MessageRedeemedHandler(ticketId: string) {
  const l1Msg = await l1MsgRepo.find({ l2TicketId: ticketId });
  if (!l1Msg) {
    return;
  }
  logger.info("Deposit message becomes redeemed", {
    msgId: l1Msg.msgId.toString(),
    l2TicketId: ticketId,
  });
  l1Msg.becomeRedeemed();
  await l1MsgRepo.update(l1Msg);
  // withdraw from L2 in response to deposit from L1
  await withdraw();
}

async function l1MessageRetryableHandler(ticketId: string) {
  const l1Msg = await l1MsgRepo.find({ l2TicketId: ticketId });
  if (!l1Msg) {
    return;
  }
  logger.info("Deposit message becomes retryable", {
    msgId: l1Msg.msgId.toString(),
    l2TicketId: ticketId,
  });
  l1Msg.becomeRetryable();
  await l1MsgRepo.update(l1Msg);
}

async function l2MessageExecutableHandler(
  batchNumber: BigNumber,
  outboxIndex: BigNumber,
  outputRoot: string,
  numberInBatch: BigNumber
) {
  const l2Msgs = await l2MsgRepo.findMany({
    batchNumber,
  });
  logger.info("Withdraw message becomes executable", {
    batchNumber,
    outboxIndex,
    numberInBatch,
    msgCount: l2Msgs.length,
  });
  for (const l2Msg of l2Msgs) {
    l2Msg.becomeExecutable();
    await l2MsgRepo.update(l2Msg);
  }
}

async function l2WithdrawMessageHandler(
  caller: string,
  dest: string,
  uniqueId: BigNumber,
  batchNumber: BigNumber,
  indexInBatch: BigNumber,
  arbBlockNum: BigNumber,
  ethBlockNum: BigNumber,
  timestamp: BigNumber,
  callValue: BigNumber,
  data: string
) {
  let tx: ethers.utils.TransactionDescription;
  try {
    tx = L1ERC20Gateway.interface.parseTransaction({
      data,
    });
  } catch (e) {
    return;
  }
  if (
    tx.sighash !==
    L1ERC20Gateway.interface.getSighash("finalizeInboundTransfer")
  ) {
    return;
  }
  if (tx.args[1] !== arbSigner.address) {
    return;
  }
  logger.info("Withdraw message is sent ", {
    uniqueId,
    batchNumber,
    indexInBatch,
    arbBlockNum,
    ethBlockNum,
    timestamp,
    callValue,
    data,
  });
  await l2MsgRepo.create(
    new L2Message(
      uniqueId,
      batchNumber,
      indexInBatch,
      arbBlockNum,
      ethBlockNum,
      new Date(timestamp.mul(1000).toNumber()),
      callValue,
      L2MessageStatus.Sent
    )
  );
}
