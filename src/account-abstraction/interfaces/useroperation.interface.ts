/**
 * User Operation struct
 * @Param sender: the address of a smart contract wallet.  
 * nonce: the count of the transactions of a smart contract wallet.  
 * initCode: if smart contract wallet, set 0x; else set the address of a smart contract wallet factory.  
 * callData: the method call to execute on this account.  
 * accountGasLimits: 16 bytes + 16 bytes.  
 * preVerificationGas: none.  
 * gasFees: 16 bytes + 16 bytes.  
 * paymasterAndData: for paymaster.  
 * signature: 65 bytes signature.
 *
 * example: https://github.com/eth-infinitism/account-abstraction/blob/develop/test/UserOperation.ts  
 * description: https://github.com/eth-infinitism/account-abstraction/blob/develop/contracts/interfaces/PackedUserOperation.sol
 */
export interface PackedUserOperation {
  sender: string;
  nonce: string;
  initCode: string;
  callData: string;
  accountGasLimits: string;
  preVerificationGas: string;
  gasFees: string;
  paymasterAndData: string;
  signature: string;
}
