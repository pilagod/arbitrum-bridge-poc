import { ethers } from "ethers";
import { ethTestToken, getBridge } from "../networks";

async function main() {
  const bridge = await getBridge();
  const l2Address = await bridge.getERC20L2Address(ethTestToken.address);
  console.log(`L2 address for TKN: ${l2Address}`);
  const tokenData = await bridge.getAndUpdateL2TokenData(ethTestToken.address);
  const { balance, contract } = tokenData!.ERC20!;
  console.log(`L2 balance: `, ethers.utils.formatUnits(balance));
  console.log(`L2 contract: `, contract);
}

main().then(() => {
  process.exit(0);
});
