import { ethers } from "ethers";
import { arbTestToken } from "../contracts";
import { arbSigner } from "../networks";

async function main() {
  console.log(
    `Arb TKN balance: ${arbSigner.address}: ${ethers.utils.formatUnits(
      await arbTestToken.balanceOf(arbSigner.address)
    )}`
  );
  console.log(
    `Arb TKN total supply: ${ethers.utils.formatUnits(
      await arbTestToken.totalSupply()
    )}`
  );
}

main().then(() => {
  process.exit(0);
});
