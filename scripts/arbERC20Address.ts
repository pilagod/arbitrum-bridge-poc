import { ethers } from "ethers";
import { EthTestToken } from "@contract";
import { getBridge } from "@network";

async function main() {
  const bridge = await getBridge();
  const l2Address = await bridge.getERC20L2Address(EthTestToken.address);
  console.log(`L2 address for TKN: ${l2Address}`);
  const tokenData = await bridge.getAndUpdateL2TokenData(EthTestToken.address);
  const { balance, contract } = tokenData!.ERC20!;
  console.log(`L2 balance: `, ethers.utils.formatUnits(balance));
  console.log(`L2 contract interface:`);
  console.log(Object.keys(contract.interface.functions).join("\n"));
}

main().then(() => {
  process.exit(0);
});
