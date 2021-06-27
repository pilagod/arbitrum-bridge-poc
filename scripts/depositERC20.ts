import { ethers } from "ethers";
import { ethTestToken } from "../contracts";
import { arbSigner, ethSigner, getBridge } from "../networks";
import { printEventLog } from "../printer";

async function main() {
  const bridge = await getBridge();
  console.log(
    `Deposit 1 TKN from Rin ${ethSigner.address} to Arb ${arbSigner.address}`
  );
  console.log(
    `Rin TKN balance before deposit: ${ethers.utils.formatUnits(
      await ethTestToken.balanceOf(ethSigner.address)
    )}`
  );
  await bridge.approveToken(ethTestToken.address);
  const tx = await bridge.deposit(
    ethTestToken.address,
    ethers.utils.parseEther("1")
  );
  const receipt = await tx.wait();
  console.log("Events: ", (receipt.events ?? []).map(printEventLog));
  console.log(
    `Rin TKN balance after deposit: ${ethers.utils.formatUnits(
      await ethTestToken.balanceOf(ethSigner.address)
    )}`
  );
  console.log(`Deposit requested`);
}

main().then(() => {
  process.exit(0);
});
