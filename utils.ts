import { Event } from "ethers";

export function printEventLog(log: Event) {
  return {
    blockNumber: log.blockNumber,
    blockHash: log.blockHash,
    transactionIndex: log.transactionIndex,
    transactionHash: log.transactionHash,
    address: log.address,
    event: log.event,
    eventSignature: log.eventSignature,
    topics: log.topics,
    data: log.data,
    ...(log.args
      ? {
          args: log.args.map((arg) => {
            return `${arg}`;
          }),
          keyArgs: Object.keys(log.args).reduce((res, key) => {
            if (isNaN(key as any)) {
              res[key] = `${log.args![key]}`;
            }
            return res;
          }, {} as { [key: string]: any }),
        }
      : {}),
  };
}
