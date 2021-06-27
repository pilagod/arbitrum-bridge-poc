import { ethers } from "ethers";
import { arbSigner, ethSigner, getBridge } from "../networks";
import { printEventLog } from "../printer";

async function main() {
  const bridge = await getBridge();
  console.log(
    `Withdraw 0.1 ETH from Arb ${arbSigner.address} to Rin ${ethSigner.address}`
  );
  console.log(
    `Arb ETH balance before withdraw: ${ethers.utils.formatUnits(
      await arbSigner.getBalance()
    )}`
  );
  const tx = await bridge.withdrawETH(ethers.utils.parseEther("0.1"));
  const receipt = await tx.wait();
  console.log(`Events: `, (receipt.events ?? []).map(printEventLog));
  console.log(
    `Arb ETH balance after withdraw: ${ethers.utils.formatUnits(
      await arbSigner.getBalance()
    )}`
  );
  console.log(`Withdraw requested`);
}

main().then(() => {
  process.exit(0);
});
