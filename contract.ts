import { ethers } from "ethers";
import ArbSysABI from "@abi/arbSys";
import {
  abi as TestTokenABI,
  address as TestTokenAddress,
} from "@deployments/rinkeby/TestToken.json";
import { arbSigner, ethSigner } from "@network";
import { TestToken } from "@typechain";

export const ArbSys = new ethers.Contract(
  "0x0000000000000000000000000000000000000064",
  ArbSysABI,
  arbSigner
);

export const ArbTestToken = new ethers.Contract(
  "0xD407792A878E1225cf10221003074372b457d165",
  TestTokenABI,
  arbSigner
) as TestToken;

export const EthTestToken = new ethers.Contract(
  TestTokenAddress,
  TestTokenABI,
  ethSigner
) as TestToken;
