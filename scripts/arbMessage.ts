import { BridgeHelper } from "arb-ts";
import { arbProvider, ethProvider, getBridge } from "../networks";
import { parseMessageArgsAsBigNumber } from "../parser";
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

async function main() {
  const { batchNumber, batchIndex } = parseMessageArgsAsBigNumber();

  const bridge = await getBridge();

   try {
     const messageProof = await BridgeHelper.tryGetProofOnce(
       batchNumber,
       batchIndex,
       arbProvider
     );
     console.log("proof: ", printArgs(messageProof));
   } catch (e) {
     console.log("cannot get proof: ", e);
   }
  
  const message = await BridgeHelper.getOutgoingMessage(
    batchNumber,
    batchIndex,
    arbProvider
  );
  console.log("message: ", message.map(printArgs));

  const messageState: OutgoingMessageState =
    await bridge.getOutGoingMessageState(batchNumber, batchIndex);

  console.log("message state:", OutgoingMessageState[messageState]);


  const entry = await BridgeHelper.getOutboxEntry(
    batchNumber,
    await bridge.getOutboxAddress(),
    ethProvider
  );
  console.log("entry: ", entry);
}

main().then(() => {
  process.exit(0);
});
