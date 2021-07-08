import { BridgeHelper } from "arb-ts";
import { Contract, ContractTransaction } from "ethers";
import OutboxABI from "@abi/outbox";
import { EthTestToken } from "@contract";
import { arbProvider, ethSigner, getBridge } from "@network";
import { parseMessageArgsAsBigNumber } from "../parser";
import { printBalance, printEventLog } from "../printer";

// First successfully executeTransaction tx:
// https://rinkeby.etherscan.io/tx/0x0c69dda0870d160947cf4a357b4b9904c7ca21c87df27736e56cf407896fa5cd

async function main() {
  const { batchNumber, batchIndex } = parseMessageArgsAsBigNumber();
  const proof = await BridgeHelper.tryGetProofOnce(
    batchNumber,
    batchIndex,
    arbProvider
  );
  if (!proof) {
    console.log("Proof not found for message");
    return;
  }
  const bridge = await getBridge();
  const outboxAddress = await bridge.getOutboxAddress();
  const outbox = new Contract(outboxAddress, OutboxABI, ethSigner);
  console.log(
    `Rin ETH balance before execute: ${printBalance(
      await ethSigner.getBalance()
    )}`
  );
  console.log(
    `Rin TKN balance before execute: ${printBalance(
      await EthTestToken.balanceOf(ethSigner.address)
    )}`
  );
  const tx = (await outbox.executeTransaction(
    batchNumber,
    proof.proof,
    proof.path,
    proof.l2Sender,
    proof.l1Dest,
    proof.l2Block,
    proof.l1Block,
    proof.timestamp,
    proof.amount,
    proof.calldataForL1
  )) as ContractTransaction;
  const receipt = await tx.wait();
  console.log("Events: ", (receipt.events || []).map(printEventLog));
  console.log(
    `Rin ETH balance after execute: ${printBalance(
      await ethSigner.getBalance()
    )}`
  );
  console.log(
    `Rin TKN balance after execute: ${printBalance(
      await EthTestToken.balanceOf(ethSigner.address)
    )}`
  );
}

main().then(() => {
  process.exit(0);
});
