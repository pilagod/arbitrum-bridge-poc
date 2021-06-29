import { arbTestToken, ethTestToken } from "../contracts";
import { arbSigner, ethSigner } from "../networks";
import { printBalance } from "../printer";

async function main() {
  console.log("---------");
  console.log(`Rin ETH balance: ${printBalance(await ethSigner.getBalance())}`);
  console.log(
    `Rin TKN balance: ${printBalance(
      await ethTestToken.balanceOf(ethSigner.address)
    )}`
  );
  console.log("----------");
  console.log(`Arb ETH balance: ${printBalance(await arbSigner.getBalance())}`);
  console.log(
    `Arb TKN balance: ${printBalance(
      await arbTestToken.balanceOf(arbSigner.address)
    )}`
  );
}

main().then(() => {
  process.exit(0);
});
