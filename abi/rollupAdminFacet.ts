export default [
  {
    inputs: [
      {
        type: "address",
      },
    ],
    name: "isValidator",
    outputs: [
      {
        type: "boolean",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_validator",
        type: "address[]",
      },
      {
        internalType: "bool[]",
        name: "_val",
        type: "bool[]",
      },
    ],
    name: "setValidator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
