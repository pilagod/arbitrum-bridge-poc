import { BridgeHelper } from "arb-ts";
import { BigNumber } from "ethers";
import yargs from "yargs";
import { arbProvider, ethProvider, getBridge } from "../networks";
import { printArgs } from "../printer";

enum OutgoingMessageState {
  /**
   * No corresponding {@link L2ToL1EventResult} emitted
   */
  NOT_FOUND = 0,
  /**
   * ArbSys.sendTxToL1 called, but assertion not yet confirmed
   */
  UNCONFIRMED = 1,
  /**
   * Assertion for outgoing message confirmed, but message not yet executed
   */
  CONFIRMED = 2,
  /**
   * Outgoing message executed (terminal state)
   */
  EXECUTED = 3,
}

const argv = yargs
  .option("batchNumber", {
    alias: "n",
    description: "Batch number including message",
    type: "number",
    demandOption: true,
  })
  .option("batchIndex", {
    alias: "i",
    description: "Message index in batch",
    type: "number",
    demandOption: true,
  })
  .help()
  .alias("help", "h").argv as {
  batchNumber: number;
  batchIndex: number;
};

async function main() {
  const batchNumber = BigNumber.from(argv.batchNumber);
  const batchIndex = BigNumber.from(argv.batchIndex);

  const bridge = await getBridge();

  const entry = await BridgeHelper.getOutboxEntry(
    batchNumber,
    await bridge.getOutboxAddress(),
    ethProvider
  );
  console.log("entry: ", entry);

  const message = await BridgeHelper.getOutgoingMessage(
    batchNumber,
    batchIndex,
    arbProvider
  );
  console.log("message: ", message.map(printArgs));

  const messageState: OutgoingMessageState =
    await bridge.getOutGoingMessageState(batchNumber, batchIndex);

  console.log("message state:", OutgoingMessageState[messageState]);
}

main().then(() => {
  process.exit(0);
});
