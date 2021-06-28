import { BigNumber } from "ethers";
import { getBridge } from "../networks";
import { parseMessageIdArgs } from "../parser";
import { printEventLog } from "../printer";

async function main() {
  const { msgId } = parseMessageIdArgs();
  const bridge = await getBridge();
  const ticketId = await bridge.calculateL2RetryableTransactionHash(
    BigNumber.from(msgId)
  );
  console.log("ticket id: ", ticketId);
  const tx = await bridge.l2Bridge.arbRetryableTx.functions.redeem(ticketId);
  const receipt = await tx.wait();
  console.log("Events: ", (receipt.events ?? []).map(printEventLog));
}

main().then(() => {
  process.exit(0);
});
