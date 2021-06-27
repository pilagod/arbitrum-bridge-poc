import { ethers } from "ethers";
import { arbSigner, ethSigner, getBridge } from "../networks";
import { printEventLog } from "../printer";

async function main() {
  const bridge = await getBridge();
  console.log(
    `Deposit 0.1 ETH from Rin ${ethSigner.address} to Arb ${arbSigner.address}`
  );
  console.log(
    `Rin ETH balance before deposit: ${ethers.utils.formatUnits(
      await ethSigner.getBalance()
    )}`
  );
  const tx = await bridge.depositETH(ethers.utils.parseEther("0.1"));
  const receipt = await tx.wait();
  console.log("Events: ", (receipt.events ?? []).map(printEventLog));
  console.log(
    `Rin ETH balance after deposit: ${ethers.utils.formatUnits(
      await ethSigner.getBalance()
    )}`
  );
  console.log(`Deposit requested`);
}

main().then(() => {
  process.exit(0);
});
