# SushiSwap V3 Liquidity Management

## Description

SushiSwap V3 is the latest upgrade to the decentralized exchange protocol, introducing concentrated liquidity and range orders. These features enhance efﬁciency and allow liquidity providers to allocate their capital within speciﬁc price ranges, increasing fee earnings.

## Requirements

1. User can create a liquidity position.
2. User can monitor position status.
3. User can adjust Price Range.
4. User can withdraw liquidity.

## Project setup

Note: This project uses node version `22.11.0`

1. Clone the repository.
    ```
    $ git clone https://github.com/danielrc888/sushiswap-v3-liquidity-management.git
    ```
2. Install dependencies.

    ```
    $ npm install
    ```

3. Create an `.env` file and add `RPC_URL` and `WALLET_PRIVATE_KEY` variables like in the `.env.sample` file.

4. Build the project

    ```
    $ npm run build
    ```

## Project structure

This project contains 2 folders (`blockchain/` and `script/`). 

- `blockchain/` folder

    In the `blockchain/` folder we have sushi deployed address for Sepolia testnet and variables such as the `provider` and `wallet` that are used for calling transactions.

- `script/` folder

    In the script folder we have the scripts used to meet the requirements. It also contains script for the testnet setup.

## Run a script

To run a script you can run this command after building the project

```    
$ node dist/scripts/<script_name.js>
```

## Demo on Sepolia ETH Testnet

Note: For the Demo whe need a wallet with 2 ERC20 token to create a pool V3 on sushiswap

1. Create a pool V3 on sushiswap

    Tx hash: [0x5e71335589b838e92b5c6e32c33341c2e16f3ad3fe534aa288947b7bd7a3675c](https://sepolia.etherscan.io/tx/0x5e71335589b838e92b5c6e32c33341c2e16f3ad3fe534aa288947b7bd7a3675c)

2. Initialize the pool V3

    Tx hash: [0xcf56a4be13f76f93bd6983ade1ec8551e71dea959d7e09695840b67bc4b9d8fb](https://sepolia.etherscan.io/tx/0xcf56a4be13f76f93bd6983ade1ec8551e71dea959d7e09695840b67bc4b9d8fb)

3. Approve both tokens to the Sushi Position Manager

    Tx hash 1: [0x14271d617e82fd891357818e7c6bfa5d9d639ced6b12fc9dbe8408a75b123f24](https://sepolia.etherscan.io/tx/0x14271d617e82fd891357818e7c6bfa5d9d639ced6b12fc9dbe8408a75b123f24)

    Tx hash 2: [0x521d58dcd037a2e79eaad66058ed5aec917cc98ebb8cf72060bc972ba291ca72](https://sepolia.etherscan.io/tx/0x521d58dcd037a2e79eaad66058ed5aec917cc98ebb8cf72060bc972ba291ca72)

4. Create a position in the pool V3

    Tx hash: [0xc79fd5a206c4fa086edb49cb13ec6d3f30c9b21131b69b6aae5a04fc81cac994](https://sepolia.etherscan.io/tx/0xc79fd5a206c4fa086edb49cb13ec6d3f30c9b21131b69b6aae5a04fc81cac994)

5. Approve both tokens to the Sushi Swap Router

    Tx hash 1: [0x2a47889e840165f4a784f82ecf0ccf3ee713c1b05f9983ee9a584b4d688a36d8](https://sepolia.etherscan.io/tx/0x2a47889e840165f4a784f82ecf0ccf3ee713c1b05f9983ee9a584b4d688a36d8)

    Tx hash 2: [0xbaa224e2af7bf2a3089a1bca139666801e0b43dcf86d8e55f0887caf0ade74b7](https://sepolia.etherscan.io/tx/0xbaa224e2af7bf2a3089a1bca139666801e0b43dcf86d8e55f0887caf0ade74b7)

5. Swap tokens on pool V3

    Tx hash: [0x3c4533255d3b86666ce541cb6176468fe8e91c30f951a486810bf845a659d42e](https://sepolia.etherscan.io/tx/0x3c4533255d3b86666ce541cb6176468fe8e91c30f951a486810bf845a659d42e)

5. Add liquidity to the Position

    Tx hash: [0x5d3530f2b2792902104ba9467ca92e79b68639bd0e210a43c647283c633f0c7d](https://sepolia.etherscan.io/tx/0x5d3530f2b2792902104ba9467ca92e79b68639bd0e210a43c647283c633f0c7d)

6. Remove and collect fees (Both in 1 tx)

    Tx hash: [0x62474430889d313e247d704d5181f2e560295899238b69ca233a8dcdf06fe8cd](https://sepolia.etherscan.io/tx/0x62474430889d313e247d704d5181f2e560295899238b69ca233a8dcdf06fe8cd)

7. Collect fees

    Tx hash: [0x7917bf8d2260dec6d1362ba04382e445f6d26f6d0987dc5324a9ac0fa62f06ff](https://sepolia.etherscan.io/tx/0x7917bf8d2260dec6d1362ba04382e445f6d26f6d0987dc5324a9ac0fa62f06ff)


8. Monitor positions from and address

## Screenshots

### Create a pool V3 on sushiswap

![image](https://github.com/user-attachments/assets/7cc9e67c-20c7-4755-87f3-121b79dca2ca)

### Initialize the pool V3

![image](https://github.com/user-attachments/assets/4ad97eb0-393f-42fc-8bdf-17de18f09e9d)

### Approve both tokens to the Sushi Position Manager

![image](https://github.com/user-attachments/assets/4e9b37d8-2af9-436d-b4d4-096cc9950abe)

![image](https://github.com/user-attachments/assets/1e166bf2-dd54-420a-9417-d2a943ce9499)

### Create a position in the pool V3

![image](https://github.com/user-attachments/assets/99b9f3e1-a07a-4a96-acfe-0208a10aa835)

### Approve both tokens to the Sushi Swap Router

![image](https://github.com/user-attachments/assets/353a3147-0efc-4b04-a41d-58ab8d38ad18)

![image](https://github.com/user-attachments/assets/b3db03fa-0a85-4513-960d-0caa56adcf00)

### Swap tokens on pool V3

![image](https://github.com/user-attachments/assets/82704732-3aaa-44d3-ab3a-c4e1686935b8)

### Add liquidity to the Position

![image](https://github.com/user-attachments/assets/0f04de08-ddc4-4811-ba35-bfbfae70e26b)

### Remove and collect fees

![image](https://github.com/user-attachments/assets/f8a81630-17dc-414e-8acc-59282e90cc06)

### Collect fees

![image](https://github.com/user-attachments/assets/53bdde25-bd95-4acf-8cf3-1b7a01473369)

### Monitor positions from an address
![image](https://github.com/user-attachments/assets/b7d0a7ad-bc68-4d0d-b45c-96871097d87f)

