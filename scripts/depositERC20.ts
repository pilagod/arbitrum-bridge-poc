import { ethers } from "ethers";
import { EthTestToken } from "@contract";
import { arbSigner, ethSigner, getBridge } from "@network";
import { printBalance, printEventLog } from "../printer";

async function main() {
  const bridge = await getBridge();
  console.log(
    `Deposit 1 TKN from Rin ${ethSigner.address} to Arb ${arbSigner.address}`
  );
  const beforeBalance = await EthTestToken.balanceOf(ethSigner.address);
  await bridge.approveToken(EthTestToken.address);
  const tx = await bridge.deposit(
    EthTestToken.address,
    ethers.utils.parseEther("1")
  );
  const receipt = await tx.wait();
  const afterBalance = await EthTestToken.balanceOf(ethSigner.address);
  console.log("Events: ", (receipt.events ?? []).map(printEventLog));
  console.log(`Rin TKN balance before deposit: ${printBalance(beforeBalance)}`);
  console.log(`Rin TKN balance after deposit: ${printBalance(afterBalance)}`);
  console.log(`Deposit requested`);
}

main().then(() => {
  process.exit(0);
});
