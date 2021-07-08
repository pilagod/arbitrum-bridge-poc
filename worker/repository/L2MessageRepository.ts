import { BigNumber } from "ethers";
import db from "../db";
import { L2Message, L2MessageStatus } from "../model/L2Message";

type L2MessageQuery = {
  status?: L2MessageStatus;
};

export default class L2MessageRepository {
  public findMany(query: L2MessageQuery): Promise<L2Message[]> {
    return new Promise((resolve, reject) => {
      const msgs: L2Message[] = [];
      const conditions: string[] = [];
      const conditionParams: any[] = [];
      if (query.status) {
        conditions.push(`status = ?`);
        conditionParams.push(query.status);
      }
      let sql = "SELECT * FROM l2_message";
      if (conditions.length > 0) {
        sql += ` WHERE ${conditions.join(" AND ")}`;
      }
      db.each(
        sql,
        conditionParams,
        (_, row) => msgs.push(toL2Message(row)),
        (err) => (err ? reject(err) : resolve(msgs))
      );
    });
  }

  public create(msg: L2Message): Promise<void> {
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO l2_message (unique_id, batch_number, batch_index, arb_block_number, eth_block_number, timestamp, call_value, data, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          msg.uniqueId.toString(),
          msg.batchNumber.toString(),
          msg.batchIndex.toString(),
          msg.arbBlockNumber.toString(),
          msg.ethBlockNumber.toString(),
          msg.timestamp,
          msg.callValue.toString(),
          msg.data,
          msg.status,
        ],
        (err) => (err ? reject(err) : resolve())
      );
    });
  }

  public update(msg: L2Message): Promise<void> {
    return new Promise((resolve, reject) => {
      db.run(
        "UPDATE l2_message SET unique_id = ?, batch_number = ?, batch_index = ?, arb_block_number = ?, eth_block_number = ?, timestamp = ?, call_value = ?, data = ?, status = ? WHERE id = ?",
        [
          msg.uniqueId.toString(),
          msg.batchNumber.toString(),
          msg.batchIndex.toString(),
          msg.arbBlockNumber.toString(),
          msg.ethBlockNumber.toString(),
          msg.timestamp,
          msg.callValue.toString(),
          msg.data,
          msg.status,
          msg.id,
        ],
        (err) => (err ? reject(err) : resolve())
      );
    });
  }
}

function toL2Message(row: any): L2Message {
  return new L2Message(
    BigNumber.from(row.unique_id),
    BigNumber.from(row.batch_number),
    BigNumber.from(row.batch_index),
    BigNumber.from(row.arb_block_number),
    BigNumber.from(row.eth_block_number),
    new Date(row.timestamp),
    BigNumber.from(row.call_value),
    row.status as L2MessageStatus,
    {
      id: row.id,
      data: row.data,
      createdAt: new Date(row.created_at),
    }
  );
}
