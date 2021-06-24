require("dotenv").config();

import { Bridge } from "arb-ts";
import { ethers } from "ethers";

const address = process.env.WALLET_ADDRESS as string;
const privateKey = process.env.WALLET_PRIVATE_KEY as string;
const networks = {
  arbitrum: {
    url: "https://rinkeby.arbitrum.io/rpc",
    account: { address, privateKey },
  },
  rinkeby: {
    url: process.env.RINKEBY_RPC_URL as string,
    account: { address, privateKey },
  },
};

// eth
const ethProvider = new ethers.providers.JsonRpcProvider(networks.rinkeby.url);
const ethSigner = new ethers.Wallet(
  networks.rinkeby.account.privateKey,
  ethProvider
);

// arb
const arbProvider = new ethers.providers.JsonRpcProvider(networks.arbitrum.url);
const arbSigner = new ethers.Wallet(
  networks.arbitrum.account.privateKey,
  arbProvider
);

// bridge

let bridge: Bridge;

async function getBridge() {
  if (!bridge) {
    bridge = await Bridge.init(ethSigner, arbSigner);
  }
  return bridge;
}

export {
  networks,
  // eth
  ethProvider,
  ethSigner,
  // arb
  arbProvider,
  arbSigner,
  // brige
  getBridge,
};
