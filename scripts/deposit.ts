import { ethers } from "ethers";
import { arbSigner, ethSigner, getBridge } from "../networks";

async function main() {
  const bridge = await getBridge();
  console.log(
    `Deposit 0.1 ETH from Eth ${ethSigner.address} to Arb ${arbSigner.address}`
  );
  await bridge.depositETH(ethers.utils.parseEther("0.1"));
  console.log(`Deposit requested`);
}

main().then(() => {
  process.exit(0);
});
