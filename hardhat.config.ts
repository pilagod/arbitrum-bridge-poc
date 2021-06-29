import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";

import "hardhat-deploy";
import "tsconfig-paths/register";

import { networks } from "./networks";

export default {
  networks: {
    L1: {
      url: networks.L1.url,
      accounts: [networks.L1.account.privateKey],
    },
    L2: {
      url: networks.L2.url,
      accounts: [networks.L2.account.privateKey],
    },
  },
  solidity: {
    version: "0.8.5",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
