import { ethers } from "ethers";
import { arbTestToken } from "../contracts";
import { arbSigner } from "../networks";

async function main() {
  console.log(
    `TKN balance for Arb ${arbSigner.address}: ${ethers.utils.formatUnits(
      await arbTestToken.balanceOf(arbSigner.address)
    )} TKN`
  );
  console.log(
    `TKN total supply on Arb: ${ethers.utils.formatUnits(
      await arbTestToken.totalSupply()
    )} TKN`
  );
}

main().then(() => {
  process.exit(0);
});
