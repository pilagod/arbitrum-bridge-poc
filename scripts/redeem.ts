import { BigNumber } from "ethers";
import { getBridge } from "@network";
import { parseMessageNumArgs } from "../parser";
import { printEventLog } from "../printer";

async function main() {
  const { msgNum } = parseMessageNumArgs();
  const bridge = await getBridge();
  const ticketId = await bridge.calculateL2RetryableTransactionHash(
    BigNumber.from(msgNum)
  );
  console.log("ticket id: ", ticketId);
  const tx = await bridge.l2Bridge.arbRetryableTx.functions.redeem(ticketId);
  const receipt = await tx.wait();
  console.log("Events: ", (receipt.events ?? []).map(printEventLog));
}

main().then(() => {
  process.exit(0);
});
