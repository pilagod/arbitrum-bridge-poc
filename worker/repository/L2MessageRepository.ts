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
        (_, row) =>
          msgs.push(
            new L2Message(
              row.unique_id,
              row.batch_number,
              row.batch_index,
              row.arb_block_number,
              row.eth_block_number,
              new Date(row.timestamp),
              row.call_value,
              row.status as L2MessageStatus,
              {
                id: row.id,
                data: row.data,
                createdAt: new Date(row.created_at),
              }
            )
          ),
        (err) => (err ? reject(err) : resolve(msgs))
      );
    });
  }

  public create(msg: L2Message): Promise<void> {
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO l2_message (unique_id, batch_number, batch_index, arb_block_number, eth_block_number, timestamp, call_value, data, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          msg.uniqueId,
          msg.batchNumber,
          msg.batchIndex,
          msg.arbBlockNumber,
          msg.ethBlockNumber,
          msg.timestamp,
          msg.callValue,
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
          msg.uniqueId,
          msg.batchNumber,
          msg.batchIndex,
          msg.arbBlockNumber,
          msg.ethBlockNumber,
          msg.timestamp,
          msg.callValue,
          msg.data,
          msg.status,
          msg.id,
        ],
        (err) => (err ? reject(err) : resolve())
      );
    });
  }
}
