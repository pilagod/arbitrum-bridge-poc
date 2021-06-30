import { ethers } from "ethers";
import { ethProvider } from "../networks";
import { printBalance } from "../printer";

async function main() {
  const wallet = ethers.Wallet.createRandom();
  const signer = ethProvider.getSigner(0);
  const tx = await signer.sendTransaction({
    to: wallet.address,
    value: ethers.utils.parseEther("5.0"),
  });
  await tx.wait();
  console.log("Wallet created");
  console.log(`address: ${wallet.address}`);
  console.log(`private key: ${wallet.privateKey}`);
  console.log(
    `balance: ${printBalance(await ethProvider.getBalance(wallet.address))}`
  );
}

main().then(() => process.exit(0));
