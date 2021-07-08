import { BigNumber } from "ethers";

export enum L1MessageStatus {
  Sent = "Sent",
  Retryable = "Retryable",
  Done = "Done",
}

export class L1Message {
  public id: number;
  public createdAt: Date;

  public constructor(
    public msgId: BigNumber,
    public msgData: string,
    public l2TicketId: string,
    public status: L1MessageStatus,
    optionals: {
      id?: number;
      createdAt?: Date;
    } = {}
  ) {
    const { id = 0, createdAt = new Date() } = optionals;
    this.id = id;
    this.createdAt = createdAt;
  }
}
