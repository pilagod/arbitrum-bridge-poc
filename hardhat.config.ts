import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";

import "hardhat-deploy";
import "tsconfig-paths/register";

import { networks } from "./networks";

export default {
  networks: {
    arbitrum: {
      url: networks.arbitrum.url,
      accounts: [networks.arbitrum.account.privateKey],
    },
    rinkeby: {
      url: networks.rinkeby.url,
      accounts: [networks.rinkeby.account.privateKey],
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
