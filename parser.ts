import { BigNumber } from "ethers";
import yargs from "yargs";

export function parseMessageNumArgs() {
  return yargs
    .option("msgNum", {
      alias: "m",
      description: "L1 message number",
      type: "number",
      demandOption: true,
    })
    .help()
    .alias("help", "h").argv as {
    msgNum: number;
  };
}

export function parseMessageArgs(): {
  batchNumber: number;
  batchIndex: number;
} {
  return yargs
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
}

export function parseMessageArgsAsBigNumber(): {
  batchNumber: BigNumber;
  batchIndex: BigNumber;
} {
  const { batchNumber, batchIndex } = parseMessageArgs();
  return {
    batchNumber: BigNumber.from(batchNumber),
    batchIndex: BigNumber.from(batchIndex),
  };
}
