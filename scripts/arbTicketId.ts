import { BigNumber } from "ethers";
import { getBridge } from "@network";
import { parseMessageNumArgs } from "../parser";

async function main() {
  const { msgNum } = parseMessageNumArgs();
  const bridge = await getBridge();
  const l2TxHash = await bridge.calculateL2RetryableTransactionHash(
    BigNumber.from(msgNum)
  );
  console.log("L2 ticket id (a.k.a. tx hash): ", l2TxHash);
}

main().then(() => {
  process.exit(0);
});
