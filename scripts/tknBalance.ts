import { ArbTestToken, EthTestToken } from "@contract";
import { arbSigner, ethSigner } from "@network";
import { printBalance } from "../printer";

async function main() {
  console.log("---------");
  console.log(
    `Rin TKN balance: ${printBalance(
      await EthTestToken.balanceOf(ethSigner.address)
    )}`
  );
  console.log(
    `Arb TKN balance: ${printBalance(
      await ArbTestToken.balanceOf(arbSigner.address)
    )}`
  );
  console.log("----------");
}

main().then(() => process.exit(0));
