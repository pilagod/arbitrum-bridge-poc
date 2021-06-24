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
- `RINKEBY_RPC_URL`: Rinkeby RPC URL e.g., [Alchemy](https://www.alchemy.com/), [Infura](https://infura.io/)

### Prepare ETH

Command execution needs gas, please first get ETH to the wallet on Rinkeby  side.

- [Rinkeby Authenticated Faucet](https://faucet.rinkeby.io/)
- or anywhere else you know

## Commands

Commands transfer ETH or tokens back and forth to the same wallet on Rinkeby and Arbitrum.

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

- message

    `message` queries outgoing (Arbitrum to Rinkeby) message state.

    `batchNumber` and `batchIndex` are required arguments, which encoded in events emitted from `withdraw` command.

    ```sh
    yarn execute scripts/message.ts --help

    Options:
        --version      Show version number                               [boolean]
    -n, --batchNumber  Batch number including message          [number] [required]
    -i, --batchIndex   Message index in batch                  [number] [required]
    -h, --help         Show help                                         [boolean]

    yarn execute scripts/message.ts -n 47 -i 6
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
