import { arbSigner, ethSigner } from "../networks";
import { printBalance } from "../printer";

async function main() {
  console.log("----------")
  console.log(`Rin ETH balance: ${printBalance(await ethSigner.getBalance())}`);
  console.log(`Arb ETH balance: ${printBalance(await arbSigner.getBalance())}`);
  console.log("----------")
}

main().then(() => process.exit(0));
