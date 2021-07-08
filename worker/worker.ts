import { Outbox } from "@contract";
import { getBridge } from "@network";
import logger from "./logger";
import { L1Message, L1MessageStatus } from "./model/L1Message";
import { L2Message, L2MessageStatus } from "./model/L2Message";
import L1MessageRepository from "./repository/L1MessageRepository";
import L2MessageRepository from "./repository/L2MessageRepository";

const l1MsgRepo = new L1MessageRepository();
const l2MsgRepo = new L2MessageRepository();

export default async function worker(): Promise<void> {
  logger.info("Worker started");
  // if there are retryable messages from L1 to L2, redeem them
  const l1RetryableMsgs = await l1MsgRepo.findMany({
    status: L1MessageStatus.Retryable,
  });
  if (l1RetryableMsgs.length > 0) {
    await redeem(l1RetryableMsgs);
  }
  // if there are executable messages from L2 to L1, execute them
  const l2ExecutableMsgs = await l2MsgRepo.findMany({
    status: L2MessageStatus.Executable,
  });
  if (l2ExecutableMsgs.length > 0) {
    await execute(l2ExecutableMsgs);
  }
  logger.info("Worker finished");
}

async function redeem(l1Msgs: L1Message[]) {
  const bridge = await getBridge();
  for (const l1Msg of l1Msgs) {
    try {
      const tx = await bridge.l2Bridge.arbRetryableTx.functions.redeem(
        l1Msg.l2TicketId
      );
      await tx.wait();
    } catch (e) {
      logger.error("Cannot redeem L1 message", {
        msgId: l1Msg.msgId.toString(),
        error: e,
      });
      continue;
    }
    l1Msg.becomeRedeemed();
    await l1MsgRepo.update(l1Msg);
  }
  logger.info("Redeem messages successfully", {
    msgIds: l1Msgs.map((m) => m.msgId.toString()),
  });
}

async function execute(l2Msgs: L2Message[]) {
  const bridge = await getBridge();
  for (const l2Msg of l2Msgs) {
    const proof = await bridge.tryGetProofOnce(
      l2Msg.batchNumber,
      l2Msg.batchIndex
    );
    if (!proof) {
      logger.error("Cannot find L2 proof", {
        uniqueId: l2Msg.uniqueId.toString(),
        batchNumber: l2Msg.batchNumber.toString(),
        batchIndex: l2Msg.batchIndex.toString(),
      });
      continue;
    }
    try {
      const tx = await Outbox.executeTransaction(
        l2Msg.batchNumber,
        proof.proof,
        proof.path,
        proof.l2Sender,
        proof.l1Dest,
        proof.l2Block,
        proof.l1Block,
        proof.timestamp,
        proof.amount,
        proof.calldataForL1
      );
      await tx.wait();
    } catch (e) {
      logger.error("Cannot execute L2 message", {
        uniqueId: l2Msg.uniqueId.toString(),
        batchNumber: l2Msg.batchNumber.toString(),
        batchIndex: l2Msg.batchIndex.toString(),
        error: e,
      });
      continue;
    }
    l2Msg.becomeExecuted();
    await l2MsgRepo.update(l2Msg);
  }
}
