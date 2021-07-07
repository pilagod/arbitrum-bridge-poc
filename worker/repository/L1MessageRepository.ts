import db from "../db";
import { L1Message, L1MessageStatus } from "../model/L1Message";

type L1MessageQuery = {
  status?: L1MessageStatus;
};

export default class L1MessageRepository {
  public findMany(query: L1MessageQuery): Promise<L1Message[]> {
    return new Promise((resolve, reject) => {
      const msgs: L1Message[] = [];
      const conditions: string[] = [];
      const conditionParams: any[] = [];
      if (query.status) {
        conditions.push(`status = ?`);
        conditionParams.push(query.status);
      }
      let sql = "SELECT * FROM l1_message";
      if (conditions.length > 0) {
        sql += ` WHERE ${conditions.join(" AND ")}`;
      }
      db.each(
        sql,
        conditionParams,
        (_, row) =>
          msgs.push(
            new L1Message(
              row.msg_id,
              row.msg_data,
              row.l2_ticket_id,
              row.status as L1MessageStatus,
              {
                id: row.id,
                createdAt: new Date(row.created_at),
              }
            )
          ),
        (err) => (err ? reject(err) : resolve(msgs))
      );
    });
  }

  public create(msg: L1Message): Promise<void> {
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO l1_message (msg_id, msg_data, l2_ticket_id, status) VALUES (?, ?, ?, ?)",
        [msg.msgId, msg.msgData, msg.l2TicketId, msg.status],
        (err) => (err ? reject(err) : resolve())
      );
    });
  }

  public update(msg: L1Message): Promise<void> {
    return new Promise((resolve, reject) => {
      db.run(
        "UPDATE l1_message SET msg_id = ?, msg_data = ?, l2_ticket_id = ?, status = ? WHERE id = ?",
        [msg.msgId, msg.msgData, msg.l2TicketId, msg.status, msg.id],
        (err) => (err ? reject(err) : resolve())
      );
    });
  }
}
