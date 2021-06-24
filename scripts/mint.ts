import { ethers } from "ethers";
import { ethSigner, ethTestToken } from "../networks";

async function main() {
  console.log(`Mint 10 TKN for Eth ${ethSigner.address}`);
  console.log(
    `Balance before mint: ${ethers.utils.formatUnits(
      await ethTestToken.balanceOf(ethSigner.address)
    )} TKN`
  );
  const tx = await ethTestToken.mint(
    ethSigner.address,
    ethers.utils.parseEther("10")
  );
  await tx.wait();
  console.log(
    `Balance after mint: ${ethers.utils.formatUnits(
      await ethTestToken.balanceOf(ethSigner.address)
    )} TKN`
  );
  console.log("Mint success.");
}

main().then(() => {
  process.exit(0);
});
