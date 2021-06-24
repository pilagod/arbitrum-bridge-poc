import { ethers } from "ethers";
import { arbSigner, ethSigner, ethTestToken, getBridge } from "../networks";

async function main() {
  const bridge = await getBridge();
  console.log(
    `Deposit 1 TKN from Eth ${ethSigner.address} to Arb ${arbSigner.address}`
  );
  await bridge.approveToken(ethTestToken.address);
  await bridge.deposit(ethTestToken.address, ethers.utils.parseEther("1"));
  console.log(`Deposit requested`);
}

main().then(() => {
  process.exit(0);
});
