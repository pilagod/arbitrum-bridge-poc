import { BigNumber } from "ethers";
import { getBridge } from "../networks";
import { parseMessageIdArgs } from "../parser";

async function main() {
  const { msgId } = parseMessageIdArgs();
  const bridge = await getBridge();
  const l2TxHash = await bridge.calculateL2RetryableTransactionHash(
    BigNumber.from(msgId)
  );
  console.log("L2 ticket id (a.k.a. tx hash): ", l2TxHash);
}

main().then(() => {
  process.exit(0);
});
