import { ethers } from "ethers";
import { EthTestToken } from "@contract";
import { ethSigner } from "@network";

async function main() {
  console.log(`Mint 10 TKN for Rin ${ethSigner.address}`);
  console.log(
    `Rin TKN balance before mint: ${ethers.utils.formatUnits(
      await EthTestToken.balanceOf(ethSigner.address)
    )}`
  );
  const tx = await EthTestToken.mint(
    ethSigner.address,
    ethers.utils.parseEther("10")
  );
  await tx.wait();
  console.log(
    `Rin TKN balance after mint: ${ethers.utils.formatUnits(
      await EthTestToken.balanceOf(ethSigner.address)
    )}`
  );
  console.log("Mint success.");
}

main().then(() => {
  process.exit(0);
});
