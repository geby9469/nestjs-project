import { PackedUserOperation } from './interfaces/useroperation.interface';
import { Injectable } from '@nestjs/common';
import {
  ContractTransactionResponse,
  ethers,
  TransactionReceipt,
} from 'ethers';
import { ConfigService } from '@nestjs/config';
import {
  encodeAccountGasLimits,
  encodeGasFees,
  getEntryPointContract,
  getSmartContractWalletContract,
  getTokenContract,
  getUserOpHash,
  getWallet,
  signUserOp,
} from './utils/ether.util';

@Injectable()
export class AccountAbstractionService {
  constructor(private readonly config: ConfigService) {}

  async createUserOperation(): Promise<PackedUserOperation> {
    // Blockchain provider
    const url = this.config.get<string>('BLOCKCHAIN_URI');
    // const jsonRpcProvider: ethers.JsonRpcProvider = getJsonRpcProvider(url);

    // Smart contract wallet
    const smartContractWalletAddress = this.config.get<string>(
      'SMART_CONTRACT_WALLET_ADDRESS',
    );
    const smartContractWalletContract: ethers.Contract =
      getSmartContractWalletContract(smartContractWalletAddress, url);
    // console.log(smartContractWalletContract);

    // ERC-20 Token
    const tokenContractAddress = this.config.get<string>(
      'ERC20_CONTRACT_ADDRESS',
    );
    const tokenContract: ethers.Contract = getTokenContract(
      tokenContractAddress,
      url,
    );
    // console.log(tokenContract);

    // encode the required data for transferring through token contract into calldata.
    const receiverAccount = this.config.get<string>('RECEIVER_ACCOUNT');
    const transferCalldata: string = tokenContract.interface.encodeFunctionData(
      'transfer',
      [receiverAccount, 1],
    );
    // console.log(transferCalldata);

    // encode the required data for executing through smart contract wallet into calldata.
    const executeCalldata: string =
      smartContractWalletContract.interface.encodeFunctionData('execute', [
        tokenContract.target,
        0,
        transferCalldata,
      ]);
    // console.log(executeCalldata);

    // Fetch the nonce from the EntryPoint.
    // you should annotate if Remix IDE.
    // const entrypointAddress = this.config.get<string>('ENTRYPOINT_ADDRESS');
    // const privateKey = this.config.get<string>('PRIVATE_KEY');
    // const entryPointContract: ethers.Contract = getEntryPointContract(
    //   entrypointAddress,
    //   url,
    //   privateKey,
    // );
    // const nonce = await entryPointContract.getNonce(
    //   smartContractWalletAddress,
    //   0,
    // );
    // console.log('nonce', nonce);

    // Create a packedUserOperation.
    const preVerificationGas: string = '500000';
    const accountGasLimits: string = encodeAccountGasLimits(550_000, 900_000);
    const gasFees: string = encodeGasFees(550_000, 900_000);
    const packedUserOperation: PackedUserOperation = {
      sender: smartContractWalletContract.target.toString(),
      nonce: '1',
      initCode: '0x',
      callData: executeCalldata,
      accountGasLimits: accountGasLimits,
      preVerificationGas: preVerificationGas,
      gasFees: gasFees,
      paymasterAndData: '0x',
      signature: '0x',
    };
    // console.log(packedUserOperation);

    return packedUserOperation;
  }

  async handleOps(
    packedUserOperation: PackedUserOperation[],
    beneficiary: string,
  ): Promise<boolean> {
    const url = this.config.get<string>('BLOCKCHAIN_URI');
    const entrypointAddress = this.config.get<string>('ENTRYPOINT_ADDRESS');
    const privateKey = this.config.get<string>('PRIVATE_KEY');
    const chainId = this.config.get<number>('BLOCKCHAIN_CHAIN_ID');

    const userOpHash: string = getUserOpHash(
      packedUserOperation[0],
      entrypointAddress,
      chainId,
    );
    console.log(userOpHash);

    // Generate a signature for ethers v6
    const signatureForRPC = signUserOp(userOpHash, privateKey);
    // console.log(signatureForRPC);

    // Add signature into packedUserOperation.
    const packedUserOperationWithSignature: string[][] =
      packedUserOperation.map((value) => [
        value.sender,
        value.nonce,
        value.initCode,
        value.callData,
        value.accountGasLimits,
        value.preVerificationGas,
        value.gasFees,
        value.paymasterAndData,
        signatureForRPC,
      ]);
    console.log(packedUserOperationWithSignature);

    // const entrypintContract: ethers.Contract = getEntryPointContract(
    //   entrypointAddress,
    //   url,
    //   privateKey,
    // );

    // const tx: ContractTransactionResponse = await entrypintContract.handleOps(
    //   packedUserOperation,
    //   beneficiary,
    //   {
    //     gasLimit: 3_000_000,
    //     gasPrice: 0,
    //   },
    // );
    // console.log(tx);
    // const receipt: TransactionReceipt = await tx.wait();
    // console.log(receipt);

    return true;
  }

  findAll() {
    return `This action returns all accountAbstraction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} accountAbstraction`;
  }

  // update(id: number, updateAccountAbstractionDto: UpdateAccountAbstractionDto) {
  //   return `This action updates a #${id} accountAbstraction`;
  // }

  remove(id: number) {
    return `This action removes a #${id} accountAbstraction`;
  }
}
