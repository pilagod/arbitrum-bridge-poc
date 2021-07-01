import { arbTestToken, ethTestToken } from "../contracts";
import { arbSigner, ethSigner } from "../networks";
import { printBalance } from "../printer";

async function main() {
  console.log("---------");
  console.log(
    `Rin TKN balance: ${printBalance(
      await ethTestToken.balanceOf(ethSigner.address)
    )}`
  );
  console.log(
    `Arb TKN balance: ${printBalance(
      await arbTestToken.balanceOf(arbSigner.address)
    )}`
  );
  console.log("----------");
}

main().then(() => process.exit(0));
