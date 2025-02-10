import { ethers } from 'ethers';
import * as EntryPoint from './abi/EntryPoint.json';
import * as SimpleAccount from './abi/SimpleAccount.json';
import * as SimpleAccountFactory from './abi/SimpleAccountFactory.json';
import * as Token from './abi/Token.json';
import { PackedUserOperation } from '../interfaces/useroperation.interface';
import {
  ecsign,
  toRpcSig,
  keccak256 as keccak256_buffer,
  ECDSASignature,
} from 'ethereumjs-util';

export function getJsonRpcProvider(url: string): ethers.JsonRpcProvider {
  return new ethers.JsonRpcProvider(url);
}

export function getWallet(url: string, privateKey: string): ethers.Wallet {
  return new ethers.Wallet(privateKey, getJsonRpcProvider(url));
}

export function getEntryPointContract(
  address: string,
  url: string,
  privateKey?: string,
): ethers.Contract {
  return new ethers.Contract(
    address,
    EntryPoint.abi,
    getWallet(url, privateKey),
  );
}

export function getSimpleAccountFactoryContract(
  address: string,
  url: string,
  privateKey?: string,
): ethers.Contract {
  return new ethers.Contract(
    address,
    SimpleAccountFactory.abi,
    getWallet(url, privateKey),
  );
}

export function getSmartContractWalletContract(
  address: string,
  url: string,
): ethers.Contract {
  return new ethers.Contract(
    address,
    SimpleAccount.abi,
    getJsonRpcProvider(url),
  );
}

export function getTokenContract(
  address: string,
  url: string,
): ethers.Contract {
  return new ethers.Contract(address, Token.abi, getJsonRpcProvider(url));
}

export function encodeAccountGasLimits(
  verificationGasLimit: number,
  callGasLimit: number,
): string {
  const packedValue =
    (BigInt(verificationGasLimit) << 128n) | BigInt(callGasLimit);
  return ethers.hexlify(ethers.zeroPadValue(ethers.toBeArray(packedValue), 32));
}

export function encodeGasFees(
  maxFeePerGas: number,
  maxPriorityFeePerGas: number,
): string {
  const packedValue =
    (BigInt(maxFeePerGas) << 128n) | BigInt(maxPriorityFeePerGas);
  return ethers.hexlify(ethers.zeroPadValue(ethers.toBeArray(packedValue), 32));
}

// https://github.com/eth-infinitism/account-abstraction/blob/6f02f5a28a20e804d0410b4b5b570dd4b076dcf9/test/UserOp.ts#L47
export function encodeUserOp(packedUserOperation: PackedUserOperation): string {
  return ethers.AbiCoder.defaultAbiCoder().encode(
    [
      'address',
      'uint256',
      'bytes32',
      'bytes32',
      'bytes32',
      'uint256',
      'bytes32',
      'bytes32',
    ],
    [
      packedUserOperation.sender,
      packedUserOperation.nonce,
      ethers.keccak256(packedUserOperation.initCode),
      ethers.keccak256(packedUserOperation.callData),
      packedUserOperation.accountGasLimits,
      packedUserOperation.preVerificationGas,
      packedUserOperation.gasFees,
      ethers.keccak256(packedUserOperation.paymasterAndData),
    ],
  );
}

export function getUserOpHash(
  packedUserOperation: PackedUserOperation,
  entrypoint: string,
  chainId: number,
): string {
  const userOpHash: string = ethers.keccak256(
    encodeUserOp(packedUserOperation),
  );
  const enc: string = ethers.AbiCoder.defaultAbiCoder().encode(
    ['bytes32', 'address', 'uint256'],
    [userOpHash, entrypoint, chainId],
  );
  return ethers.keccak256(enc);
}

export function signUserOp(userOpHash: string, privateKey: string): string {
  const message: Buffer = Buffer.concat([
    Buffer.from('\x19Ethereum Signed Message:\n32', 'ascii'),
    Buffer.from(ethers.toBeArray(userOpHash)),
  ]);
  const signature: ECDSASignature = ecsign(
    keccak256_buffer(message),
    Buffer.from(ethers.toBeArray(privateKey)),
  );
  const signatureForRPC = toRpcSig(signature.v, signature.r, signature.s);

  return signatureForRPC;
}
