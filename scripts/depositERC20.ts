import { ethers } from "ethers";
import { ethTestToken } from "../contracts";
import { arbSigner, ethSigner, getBridge } from "../networks";
import { printBalance, printEventLog } from "../printer";

async function main() {
  const bridge = await getBridge();
  console.log(
    `Deposit 1 TKN from Rin ${ethSigner.address} to Arb ${arbSigner.address}`
  );
  const beforeBalance = await ethTestToken.balanceOf(ethSigner.address);
  await bridge.approveToken(ethTestToken.address);
  const tx = await bridge.deposit(
    ethTestToken.address,
    ethers.utils.parseEther("1")
  );
  const receipt = await tx.wait();
  const afterBalance = await ethTestToken.balanceOf(ethSigner.address);
  console.log("Events: ", (receipt.events ?? []).map(printEventLog));
  console.log(`Rin TKN balance before deposit: ${printBalance(beforeBalance)}`);
  console.log(`Rin TKN balance after deposit: ${printBalance(afterBalance)}`);
  console.log(`Deposit requested`);
}

main().then(() => {
  process.exit(0);
});
