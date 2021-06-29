require("dotenv").config();

import { Bridge } from "arb-ts";
import { ethers } from "ethers";

const {
  WALLET_ADDRESS: address,
  WALLET_PRIVATE_KEY: privateKey,
  L1_RPC_URL: l1RpcUrl,
  L2_RPC_URL: l2RpcUrl,
} = process.env as { [key: string]: string };

const networks = {
  // ethereum
  L1: {
    url: l1RpcUrl,
    account: { address, privateKey },
  },
  // arbitrum
  L2: {
    url: l2RpcUrl,
    account: { address, privateKey },
  },
};

// eth
const ethProvider = new ethers.providers.JsonRpcProvider(networks.L1.url);
const ethSigner = new ethers.Wallet(
  networks.L1.account.privateKey,
  ethProvider
);

// arb
const arbProvider = new ethers.providers.JsonRpcProvider(networks.L2.url);
const arbSigner = new ethers.Wallet(
  networks.L2.account.privateKey,
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
