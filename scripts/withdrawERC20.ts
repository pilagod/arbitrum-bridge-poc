import { ethers } from "ethers";
import { ArbTestToken, EthTestToken } from "@contract";
import { arbSigner, ethSigner, getBridge } from "@network";
import { printBalance, printEventLog } from "../printer";

async function main() {
  const bridge = await getBridge();
  console.log(
    `Withdraw 0.1 TKN from Arb ${arbSigner.address} to Rin ${ethSigner.address}`
  );
  const beforeBalance = await ArbTestToken.balanceOf(arbSigner.address);
  const tx = await bridge.withdrawERC20(
    EthTestToken.address,
    ethers.utils.parseEther("0.1")
  );
  const receipt = await tx.wait();
  const afterBalance = await ArbTestToken.balanceOf(arbSigner.address);
  console.log("Events: ", (receipt.events ?? []).map(printEventLog));
  console.log(
    `Arb TKN balance before withdraw: ${printBalance(beforeBalance)}`
  );
  console.log(`Arb TKN balance after withdraw: ${printBalance(afterBalance)}`);
  console.log(`Withdraw requested`);
}

main().then(() => {
  process.exit(0);
});
