import { ethers } from "ethers";
import {
  abi as TestTokenABI,
  address as TestTokenAddress,
} from "@deployments/rinkeby/TestToken.json";
import { TestToken } from "@typechain";
import { arbSigner, ethSigner } from "./networks";

const ethTestToken = new ethers.Contract(
  TestTokenAddress,
  TestTokenABI,
  ethSigner
) as TestToken;

const arbTestToken = new ethers.Contract(
  "0xD407792A878E1225cf10221003074372b457d165",
  TestTokenABI,
  arbSigner
) as TestToken;

export { arbTestToken, ethTestToken };
