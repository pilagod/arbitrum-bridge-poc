import { BigNumber } from "ethers";
import db from "../db";
import { L1Message, L1MessageStatus } from "../model/L1Message";

type L1MessageQuery = {
  status?: L1MessageStatus;
};

export default class L1MessageRepository {
  public find(query: L1MessageQuery = {}): Promise<L1Message | undefined> {
    return new Promise((resolve, reject) => {
      const { where, params } = toSqlQuery(query);
      const msgs: L1Message[] = [];
      db.each(
        `SELECT * FROM l1_message${where ? ` WHERE ${where}` : ""} LIMIT 1`,
        params,
        (_, row) => msgs.push(toL1Message(row)),
        (err) => (err ? reject(err) : resolve(msgs[0]))
      );
    });
  }

  public findMany(query: L1MessageQuery = {}): Promise<L1Message[]> {
    return new Promise((resolve, reject) => {
      const { where, params } = toSqlQuery(query);
      const msgs: L1Message[] = [];
      db.each(
        `SELECT * FROM l1_message${where ? ` WHERE ${where}` : ""}`,
        params,
        (_, row) => msgs.push(toL1Message(row)),
        (err) => (err ? reject(err) : resolve(msgs))
      );
    });
  }

  public create(msg: L1Message): Promise<void> {
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO l1_message (msg_id, msg_data, l2_ticket_id, status) VALUES (?, ?, ?, ?)",
        [msg.msgId.toString(), msg.msgData, msg.l2TicketId, msg.status],
        (err) => (err ? reject(err) : resolve())
      );
    });
  }

  public update(msg: L1Message): Promise<void> {
    return new Promise((resolve, reject) => {
      db.run(
        "UPDATE l1_message SET msg_id = ?, msg_data = ?, l2_ticket_id = ?, status = ? WHERE id = ?",
        [msg.msgId.toString(), msg.msgData, msg.l2TicketId, msg.status, msg.id],
        (err) => (err ? reject(err) : resolve())
      );
    });
  }
}

function toSqlQuery(query: L1MessageQuery): {
  where: string;
  params: any[];
} {
  const conditions: string[] = [];
  const params: any[] = [];
  if (query.status) {
    conditions.push(`status = ?`);
    params.push(query.status);
  }
  return {
    where: conditions.join(" AND "),
    params,
  };
}

function toL1Message(row: any): L1Message {
  return new L1Message(
    BigNumber.from(row.msg_id),
    row.msg_data,
    row.l2_ticket_id,
    row.status as L1MessageStatus,
    {
      id: row.id,
      createdAt: new Date(row.created_at),
    }
  );
}
