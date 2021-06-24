import { ethers } from "ethers";
import { arbSigner, ethSigner, ethTestToken, getBridge } from "../networks";

async function main() {
  const bridge = await getBridge();
  console.log(
    `Withdraw 0.1 TKN from Arb ${arbSigner.address} to Eth ${ethSigner.address}`
  );
  const tx = await bridge.withdrawERC20(
    ethTestToken.address,
    ethers.utils.parseEther("0.1")
  );
  const receipt = await tx.wait();
  console.log("Events: ", receipt.events);
  console.log(`Withdraw requested`);
}

main().then(() => {
  process.exit(0);
});
