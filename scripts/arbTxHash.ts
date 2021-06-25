import { BigNumber } from "ethers";
import yargs from "yargs";
import { getBridge } from "../networks";

const argv = yargs
  .option("msgNum", {
    alias: "m",
    description: "L1 Message number",
    type: "number",
    demandOption: true,
  })
  .help()
  .alias("help", "h").argv as {
  msgNum: number;
};

async function main() {
  const bridge = await getBridge();
  const l2TxHash = await bridge.calculateL2RetryableTransactionHash(
    BigNumber.from(argv.msgNum)
  );
  console.log("L2 TxHash: ", l2TxHash);
  // const batchNumber = BigNumber.from(argv.batchNumber);
  // const batchIndex = BigNumber.from(argv.batchIndex);
  // const bridge = await getBridge();
  // const entry = await BridgeHelper.getOutboxEntry(
  //   batchNumber,
  //   await bridge.getOutboxAddress(),
  //   ethProvider
  // );
  // console.log("entry: ", entry);
  // const message = await BridgeHelper.getOutgoingMessage(
  //   batchNumber,
  //   batchIndex,
  //   arbProvider
  // );
  // console.log("message: ", message);
  // const messageState: OutgoingMessageState =
  //   await bridge.getOutGoingMessageState(batchNumber, batchIndex);
  // console.log("message state:", OutgoingMessageState[messageState]);
}

main().then(() => {
  process.exit(0);
});
