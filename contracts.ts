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
  "0x9a44974f48f2af569610b0b594f32a7e91c7ce30",
  TestTokenABI,
  arbSigner
) as TestToken;

export { arbTestToken, ethTestToken };
