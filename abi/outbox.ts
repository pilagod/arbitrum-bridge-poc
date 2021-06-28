export default [
  {
    inputs: [
      {
        name: "outboxIndex",
        type: "uint256",
      },
      {
        name: "proof",
        type: "bytes32[]",
      },
      {
        name: "index",
        type: "uint256",
      },
      {
        name: "l2Sender",
        type: "address",
      },
      {
        name: "destAddr",
        type: "address",
      },
      {
        name: "l2Block",
        type: "uint256",
      },
      {
        name: "l1Block",
        type: "uint256",
      },
      {
        name: "l2Timestamp",
        type: "uint256",
      },
      {
        name: "amount",
        type: "uint256",
      },
      {
        name: "calldataForL1",
        type: "bytes",
      },
    ],
    name: "executeTransaction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
