# Arbitrum Bridge POC

## Installation

```sh
# install dependencies
yarn install --frozen-lockfile

# compile contracts and generate typechain
yarn build
```

## Settings

### Arbitrum Testnet

- Network Name: Arbitrum Testnet
- RPC URL: [https://rinkeby.arbitrum.io/rpc](https://rinkeby.arbitrum.io/rpc)
- ChainID: 421611
- Symbol: ETH
- Block Explorer URL: [https://rinkeby-explorer.arbitrum.io/#/](https://rinkeby.arbitrum.io/rpc)

More info at: [https://developer.offchainlabs.com/docs/public_testnet](https://developer.offchainlabs.com/docs/public_testnet)

### Environment Variables

There are 3 environment variables required in `.env` prior to executing commands, which listed in `.env.example`:

- `WALLET_ADDRESS`: Rinkeby wallet address
- `WALLET_PRIVATE_KEY`: Rinkeby wallet private key
- `L1_RPC_URL`: L1 ethereum rpc url, e.g., localhost, [Alchemy](https://www.alchemy.com/) or [Infura](https://infura.io/)
- `L2_RPC_URL`: L2 arbitrum rpc url, e.g., [https://rinkeby.arbitrum.io/rpc](https://rinkeby.arbitrum.io/rpc) (testnet)

### Prepare ETH

Command execution needs gas, please first get ETH to the wallet on Rinkeby  side.

- [Rinkeby Authenticated Faucet](https://faucet.rinkeby.io/)
- or anywhere else you know

## Commands

Commands transfer ETH or tokens back and forth to the same wallet on Rinkeby and Arbitrum.

### ETH

- deposit

    `deposit` deposits `0.1 ETH` from Rinkeby to Arbitrum.

    ```sh
    yarn execute scripts/deposit.ts
    ```

- withdraw

    `withdraw` withdraws `0.1 ETH` from Arbitrum to Rinkeby.

    ```sh
    yarn execute scripts/withdraw.ts
    ```

### ERC20

- mint

    `mint` mints `10 TKN` on Rinkeby, which is our ERC20 token for test.

    ```sh
    yarn execute scripts/withdraw.ts 
    ```

- depositERC20

    `depositERC20` deposits `1 TKN` from Rinkeby to Arbitrum.

    ```sh
    yarn execute scripts/depositERC20.ts
    ```

- withdrawERC20

    `withdrawERC20` withdraws `0.1 TKN` from Arbitrum to Rinkeby.

    ```sh
    yarn execute scripts/withdrawERC20.ts
    ```

### Message

- executeTransaction

    `executeTransaction` executes message from L2 to L1.

    `batchNumber` and `batchIndex` are required arguments, which encoded in events emitted from `withdraw` command.

    ```sh
    yarn execute scripts/executeTransaction.ts --help

    Options:
        --version      Show version number                       [boolean]
    -n, --batchNumber  Batch number including message  [number] [required]
    -i, --batchIndex   Message index in batch          [number] [required]
    -h, --help         Show help                                 [boolean]

    yarn execute scripts/executeTransaction.ts -n 47 -i 6
    ```

- redeem

    `redeem` executes message from L1 to L2.

    `msgNum` is a required argument, which encoded as `messageNum` in events emitted from `deposit` command.

    ```sh
    yarn execute scripts/redeem.ts --help

    Options:
        --version  Show version number                           [boolean]
    -m, --msgNum   L1 message number                   [number] [required]
    -h, --help     Show help                                     [boolean]

    yarn execute scripts/redeem.ts -m 9990
    ```

### L2 State

- arbMessage

    `arbMessage` queries outgoing (Arbitrum to Rinkeby) message state.

    `batchNumber` and `batchIndex` are required arguments, which encoded in events emitted from `withdraw` command.

    ```sh
    yarn execute scripts/arbMessage.ts --help

    Options:
        --version      Show version number                               [boolean]
    -n, --batchNumber  Batch number including message          [number] [required]
    -i, --batchIndex   Message index in batch                  [number] [required]
    -h, --help         Show help                                         [boolean]

    yarn execute scripts/arbMessage.ts -n 47 -i 6
    ```

- arbERC20Address

    `arbERC20Address` lists `TKN` address and contract interface on Arbitrum.

    ```sh
    yarn execute scripts/arbERC20Address.ts
    ```

- arbERC20Balance

    `arbERC20Balance` lists `TKN` wallet balance and total supply on Arbitrum.

    ```sh
    yarn execute scripts/arbERC20Balance.ts 
    ```

- arbTicketId

    `arbTicketId` converts message unique id to ticket id.

    `msgNum` is a required argument, which encoded as `messageNum` in events emitted from `deposit` command.

    ```sh
    yarn execute scripts/arbTicketId.ts --help

    Options:
        --version  Show version number                           [boolean]
    -m, --msgNum   L1 message number                   [number] [required]
    -h, --help     Show help                                     [boolean]
    
    yarn execute scripts/arbTicketId.ts -m 9990
    ```
