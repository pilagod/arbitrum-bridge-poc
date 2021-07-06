export default [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "destAddr",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "l2Sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "outboxIndex",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "transactionIndex",
        type: "uint256",
      },
    ],
    name: "OutBoxTransactionExecuted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "batchNum",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "outboxIndex",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "outputRoot",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "numInBatch",
        type: "uint256",
      },
    ],
    name: "OutboxEntryCreated",
    type: "event",
  },
  {
    inputs: [],
    name: "beacon",
    outputs: [
      {
        internalType: "contract UpgradeableBeacon",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "bridge",
    outputs: [
      {
        internalType: "contract IBridge",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "l2Sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "destAddr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "l2Block",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "l1Block",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "l2Timestamp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "calldataForL1",
        type: "bytes",
      },
    ],
    name: "calculateItemHash",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32[]",
        name: "proof",
        type: "bytes32[]",
      },
      {
        internalType: "uint256",
        name: "path",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "item",
        type: "bytes32",
      },
    ],
    name: "calculateMerkleRoot",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "outboxIndex",
        type: "uint256",
      },
      {
        internalType: "bytes32[]",
        name: "proof",
        type: "bytes32[]",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "l2Sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "destAddr",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "l2Block",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "l1Block",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "l2Timestamp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "calldataForL1",
        type: "bytes",
      },
    ],
    name: "executeTransaction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_rollup",
        type: "address",
      },
      {
        internalType: "contract IBridge",
        name: "_bridge",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "isMaster",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "l2ToL1Block",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "l2ToL1EthBlock",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "l2ToL1Sender",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "l2ToL1Timestamp",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "outboxes",
    outputs: [
      {
        internalType: "contract OutboxEntry",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "outboxesLength",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "sendsData",
        type: "bytes",
      },
      {
        internalType: "uint256[]",
        name: "sendLengths",
        type: "uint256[]",
      },
    ],
    name: "processOutgoingMessages",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "rollup",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
