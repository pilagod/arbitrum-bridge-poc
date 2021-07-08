import { ethers } from "ethers";
import ArbRetryableTxABI from "@abi/arbRetryableTx";
import ArbSysABI from "@abi/arbSys";
import L1ERC20GatewayABI from "@abi/L1ERC20Gateway";
import L2ERC20GatewayABI from "@abi/L2ERC20Gateway";
import InboxABI from "@abi/inbox";
import OutboxABI from "@abi/outbox";
import {
  abi as TestTokenABI,
  address as TestTokenAddress,
} from "@deployments/rinkeby/TestToken.json";
import { arbSigner, ethSigner } from "@network";
import { TestToken } from "@typechain";

// TODO: move address to config

// L1

export const EthTestToken = new ethers.Contract(
  TestTokenAddress,
  TestTokenABI,
  ethSigner
) as TestToken;

export const Inbox = new ethers.Contract(
  "0x578BAde599406A8fE3d24Fd7f7211c0911F5B29e",
  InboxABI,
  ethSigner
);

export const L1ERC20Gateway = new ethers.Contract(
  "0x91169Dbb45e6804743F94609De50D511C437572E",
  L1ERC20GatewayABI,
  ethSigner
);

export const Outbox = new ethers.Contract(
  "0xefa1a42d3c4699822ee42677515a64b658be1bfc",
  OutboxABI,
  ethSigner
);

// L2

export const ArbRetryableTx = new ethers.Contract(
  "0x000000000000000000000000000000000000006e",
  ArbRetryableTxABI,
  arbSigner
);

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

export const L2ERC20Gateway = new ethers.Contract(
  "0x195C107F3F75c4C93Eba7d9a1312F19305d6375f",
  L2ERC20GatewayABI,
  arbSigner
);
