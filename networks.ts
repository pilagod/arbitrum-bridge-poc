require("dotenv").config();

import { Bridge } from "arb-ts";
import { ethers } from "ethers";

import {
  abi as TestTokenABI,
  address as TestTokenAddress,
} from "@deployments/rinkeby/TestToken.json";
import { TestToken } from "@typechain";

const address = process.env.WALLET_ADDRESS as string;
const privateKey = process.env.WALLET_PRIVATE_KEY as string;
const networks = {
  arbitrum: {
    url: "https://rinkeby.arbitrum.io/rpc",
    account: { address, privateKey },
  },
  rinkeby: {
    url: process.env.RINKEBY_RPC_URL,
    account: { address, privateKey },
  },
};

// eth
const ethProvider = new ethers.providers.JsonRpcProvider(networks.rinkeby.url);
const ethSigner = new ethers.Wallet(
  networks.rinkeby.account.privateKey,
  ethProvider
);
const ethTestToken = new ethers.Contract(
  TestTokenAddress,
  TestTokenABI,
  ethSigner
) as TestToken;

// arb
const arbProvider = new ethers.providers.JsonRpcProvider(networks.arbitrum.url);
const arbSigner = new ethers.Wallet(
  networks.arbitrum.account.privateKey,
  arbProvider
);
const arbTestToken = new ethers.Contract(
  "0x9a44974f48f2af569610b0b594f32a7e91c7ce30",
  TestTokenABI,
  arbSigner
) as TestToken;

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
  ethTestToken,
  // arb
  arbProvider,
  arbSigner,
  arbTestToken,
  // brige
  getBridge,
};
