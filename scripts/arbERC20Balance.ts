import { ethers } from "ethers";
import { ArbTestToken } from "@contract";
import { arbSigner } from "@network";

async function main() {
  console.log(
    `Arb TKN balance: ${arbSigner.address}: ${ethers.utils.formatUnits(
      await ArbTestToken.balanceOf(arbSigner.address)
    )}`
  );
  console.log(
    `Arb TKN total supply: ${ethers.utils.formatUnits(
      await ArbTestToken.totalSupply()
    )}`
  );
}

main().then(() => {
  process.exit(0);
});
