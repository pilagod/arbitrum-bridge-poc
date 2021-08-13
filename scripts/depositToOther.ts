import { L1Bridge, L2Bridge } from "arb-ts";
import { BigNumber, ethers } from "ethers";
import { arbSigner, ethSigner } from "@network";
import { printEventLog } from "../printer";

async function main() {
  // const bridge = await getBridge();
  console.log(
    `Deposit 0.1 ETH from Rin ${ethSigner.address} to Arb ${arbSigner.address}`
  );
  console.log(
    `Rin ETH balance before deposit: ${ethers.utils.formatUnits(
      await ethSigner.getBalance()
    )}`
  );
  const l2Bridge = new L2Bridge(
    "0x9413AD42910c1eA60c737dB5f58d1C504498a3cD",
    arbSigner
  );
  const maxSubmissionPriceIncreaseRatio = BigNumber.from(13);
  const maxSubmissionPrice = (await l2Bridge.getTxnSubmissionPrice(0))[0]
    .mul(maxSubmissionPriceIncreaseRatio)
    .div(BigNumber.from(10));

  const l1Bridge = new L1Bridge(
    "0x70C143928eCfFaf9F5b406f7f4fC28Dc43d68380",
    ethSigner
  );
  const inbox = await l1Bridge.getInbox();
  const tx = await inbox.functions.createRetryableTicket(
    arbSigner.address,
    ethers.utils.parseEther("0.1"),
    maxSubmissionPrice,
    arbSigner.address,
    arbSigner.address,
    155315,
    ethers.utils.parseEther("0.0000002"), // 200 gwei
    "0x",
    {
      value: ethers.utils.parseEther("0.1"),
    }
  );

  // const tx = await bridge.depositETH(ethers.utils.parseEther("0.1"));
  const receipt = await tx.wait();
  console.log("Events: ", (receipt.events ?? []).map(printEventLog));
  console.log(
    `Rin ETH balance after deposit: ${ethers.utils.formatUnits(
      await ethSigner.getBalance()
    )}`
  );
  console.log(`Deposit requested`);
}

main().then(() => {
  process.exit(0);
});
