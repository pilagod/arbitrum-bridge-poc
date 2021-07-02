import { ethers } from "ethers";
import { arbSigner, ethSigner, getBridge } from "../networks";
import { printBalance, printEventLog } from "../printer";

async function main() {
  const bridge = await getBridge();
  console.log(
    `Deposit 0.1 ETH from Rin ${ethSigner.address} to Arb ${arbSigner.address}`
  );
  const beforeBalance = await ethSigner.getBalance();
  const tx = await bridge.depositETH(ethers.utils.parseEther("0.1"));
  const receipt = await tx.wait();
  const afterBalance = await ethSigner.getBalance();
  console.log("Events: ", (receipt.events ?? []).map(printEventLog));
  console.log(`Rin ETH balance before deposit: ${printBalance(beforeBalance)}`);
  console.log(`Rin ETH balance after deposit: ${printBalance(afterBalance)}`);
  console.log(`Deposit requested`);
}

main().then(() => {
  process.exit(0);
});
