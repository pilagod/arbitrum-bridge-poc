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
    ...(log.args ? printArgs(log.args) : {}),
  };
}

export function printArgs(printArgs: any): { [key: string]: any } {
  if (!printArgs) {
    return {};
  }
  const args: any[] = isArray(printArgs) ? printArgs : [printArgs];
  return {
    args: args.map((arg) => printArg(arg)),
    keyArgs: Object.keys(args).reduce((res, key) => {
      if (isNaN(key as any)) {
        res[key] = printArg(args![key as any]);
      }
      return res;
    }, {} as { [key: string]: any }),
  };
}

export function printArg(arg: any): any {
  if (arg.map) {
    return (arg as any[]).map((a) => printArg(a));
  }
  return `${arg}`;
}

function isArray(value: any): boolean {
  return !!value.map;
}
