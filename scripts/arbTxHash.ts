import { BigNumber } from "ethers";
import yargs from "yargs";
import { getBridge } from "../networks";

async function main() {
  const argv = yargs
    .option("msgNum", {
      alias: "m",
      description: "L1 Message unique id",
      type: "number",
      demandOption: true,
    })
    .help()
    .alias("help", "h").argv as {
    msgNum: number;
  };
  const bridge = await getBridge();
  const l2TxHash = await bridge.calculateL2RetryableTransactionHash(
    BigNumber.from(argv.msgNum)
  );
  console.log("L2 TxHash: ", l2TxHash);
}

main().then(() => {
  process.exit(0);
});
