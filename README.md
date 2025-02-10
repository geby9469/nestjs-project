# Description

This project is Blockchain API. \
Current implementations as follow:

1. Account Abstraction
2. Rollups
3. HD wallet and BLS and signature aggregation

## development environment

Nest.js, Postman

* .env file \
 For blokchain: BLOCKCHAIN_URI, BLOCKCHAIN_CHAIN_ID \
 For accounts: PRIVATE_KEY, PUBLIC_KEY, RECEIVER_ACCOUNT \
 For smart contract: ENTRYPOINT_ADDRESS, SMART_CONTRACT_WALLET_ADDRESS, ERC20_CONTRACT_ADDRESS \

## API specifications

### EntryPoint handleOps

transfer ERC20: account-abstraction/entrypoint/handleOps/erc20/transfer?beneficiary=0x...
