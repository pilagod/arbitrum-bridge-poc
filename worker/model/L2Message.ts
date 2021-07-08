import { BigNumber } from "ethers";

export enum L2MessageStatus {
  Sent = "Sent",
  Executable = "Executable",
  Done = "Done",
}

export class L2Message {
  public id: number;
  public data: string;
  public createdAt: Date;

  public constructor(
    public uniqueId: BigNumber,
    public batchNumber: BigNumber,
    public batchIndex: BigNumber,
    public arbBlockNumber: BigNumber,
    public ethBlockNumber: BigNumber,
    public timestamp: Date,
    public callValue: BigNumber,
    public status: L2MessageStatus,
    optionals: {
      id?: number;
      data?: string;
      createdAt?: Date;
    } = {}
  ) {
    const { id = 0, data = "", createdAt = new Date() } = optionals;
    this.id = id;
    this.data = data;
    this.createdAt = createdAt;
  }
}
