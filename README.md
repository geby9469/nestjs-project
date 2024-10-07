# Description

Everything about Blockchain.  
List of current implementation

1. Account Abstraction API
2. Rollups API
3. HD wallet and BLS and signature aggregation

# Test

## development environment

Postman

Nest.js

### Remix IDE

* EntryPoint.sol
* SimpleAccountFactory.sol
* SimpleAccount.sol
* Token.sol

## .env file

### For blokchain

BLOCKCHAIN_URI  
BLOCKCHAIN_CHAIN_ID  

### For smart contract

ENTRYPOINT_ADDRESS  
SMART_CONTRACT_WALLET_ADDRESS  
ERC20_CONTRACT_ADDRESS  

### For accounts

PRIVATE_KEY  
RECEIVER_ACCOUNT  

# API specifications

## EntryPoint handleOps 
transfer ERC20: account-abstraction/entrypoint/handleOps/erc20/transfer?beneficiary=0x...