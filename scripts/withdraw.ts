import { ethers } from "ethers";
import { arbSigner, ethSigner, getBridge } from "../networks";

async function main() {
  const bridge = await getBridge();
  console.log(
    `Withdraw 0.1 ETH from Arb ${arbSigner.address} to Eth ${ethSigner.address}`
  );
  const tx = await bridge.withdrawETH(ethers.utils.parseEther("0.1"));
  const receipt = await tx.wait();
  console.log(`Events: `, receipt.events);
  console.log(`Withdraw requested`);
}

main().then(() => {
  process.exit(0);
});
