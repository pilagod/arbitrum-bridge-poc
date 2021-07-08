import { ethers } from "ethers";
import { EthTestToken } from "@contract";
import { getBridge } from "@network";
import logger from "./logger";

export async function deposit() {
  logger.info(`Deposit 0.1 TKN from L1`);
  const bridge = await getBridge();
  await bridge.deposit(EthTestToken.address, ethers.utils.parseEther("0.1"));
}

export async function withdraw() {
  logger.info("Withdraw 0.1 TKN from L2");
  const bridge = await getBridge();
  await bridge.withdrawERC20(
    EthTestToken.address,
    ethers.utils.parseEther("0.1")
  );
}
