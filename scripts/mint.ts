import { ethers } from "ethers";
import { ethTestToken } from "../contracts";
import { ethSigner } from "../networks";

async function main() {
  console.log(`Mint 10 TKN for Rin ${ethSigner.address}`);
  console.log(
    `Rin TKN balance before mint: ${ethers.utils.formatUnits(
      await ethTestToken.balanceOf(ethSigner.address)
    )}`
  );
  const tx = await ethTestToken.mint(
    ethSigner.address,
    ethers.utils.parseEther("10")
  );
  await tx.wait();
  console.log(
    `Rin TKN balance after mint: ${ethers.utils.formatUnits(
      await ethTestToken.balanceOf(ethSigner.address)
    )}`
  );
  console.log("Mint success.");
}

main().then(() => {
  process.exit(0);
});
