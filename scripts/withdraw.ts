import { ethers } from "ethers";
import { arbSigner, ethSigner, getBridge } from "@network";
import { printBalance, printEventLog } from "../printer";

async function main() {
  const bridge = await getBridge();
  console.log(
    `Withdraw 0.1 ETH from Arb ${arbSigner.address} to Rin ${ethSigner.address}`
  );
  const beforeBalance = await arbSigner.getBalance();
  const tx = await bridge.withdrawETH(ethers.utils.parseEther("0.1"));
  const receipt = await tx.wait();
  const afterBalance = await arbSigner.getBalance();
  console.log(`Events: `, (receipt.events ?? []).map(printEventLog));
  console.log(
    `Arb ETH balance before withdraw: ${printBalance(beforeBalance)}`
  );
  console.log(`Arb ETH balance after withdraw: ${printBalance(afterBalance)}`);
  console.log(`Withdraw requested`);
}

main().then(() => {
  process.exit(0);
});
