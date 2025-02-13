import { Inject, Injectable } from '@nestjs/common';
import { HDNodeWallet, keccak256 } from 'ethers';
import { bls12_381 as bls } from '@noble/curves/bls12-381';

@Injectable()
export class HdWalletService {
  constructor(@Inject('HD_WALLET') private hdWallet: HDNodeWallet) {}

  /**
   * @returns HDNodeWallet
   */
  getHdWallet() {
    return this.hdWallet;
  }

  /**
   * @returns Private key
   */
  getPrivateKeyOfHdWallet() {
    return this.hdWallet.privateKey;
  }

  /**
   * @param dto json -- chain, account, change, address
   * @returns HDNodeWallet
   * @example Input JSON
   * ```json
   * {
   *   "chain": "ethereum",
   *   "account": "saving",
   *   "change": "external",
   *   "address": "0"
   * }
   * ```
   */
  createChildHdWallet(dto) {
    let chain: string = '',
      account: string = '',
      change: string = '';

    switch (dto.chain) {
      case 'ethereum':
        chain = "60'";
        break;
      default:
        chain = "0690'";
        break;
    }

    switch (dto.account) {
      case 'saving':
        account = "1'";
        break;
      case 'donation':
        account = "2'";
        break;
      case 'common expenses':
        account = "3'";
        break;
      default:
        break;
    }

    switch (dto.change) {
      case 'external':
        change = '0';
        break;
      case 'internal':
        change = '1';
        break;
      default:
        break;
    }

    // Increase 1 automatically.
    const address: string = '0';

    const path = chain + '/' + account + '/' + change + '/' + address;
    const childWallet = this.hdWallet.derivePath(path);
    return childWallet;
  }

  getChildHdWallet() {
    // TODO: study how to manage child wallet. you can use the function of derivePath, deriveChild.
  }

  /**
   * Message signing with BLS should produce a signature.
   * @param message bytes32 -- input message to sign (a hash)
   * @param privateKey bytes32 --  the private key used for signing
   * @returns blsSignature -- single BLS signature
   * @example Input JSON
   * ```json
   * {
   *   "message": "This is Test",
   *   "privateKey": "bytes32",
   * }
   * ```
   */
  createBlsSignature(message: string, privateKey) {
    // convert message into a hash
    const hashWithout0x = keccak256(Buffer.from(message, 'utf-8')).replace(
      /^0x/,
      '',
    );
    return Buffer.from(
      bls.sign(hashWithout0x, privateKey.replace(/^0x/, '')),
    ).toString('hex');
  }

  /**
   * Verify the signature against the given one pubkey and one message.
   * @param message bytes32 -- the message
   * @param privateKey bytes32 --  the private key used for signing
   * @param signature bytes96 -- the signature to verify against pubkey and message
   * @returns bool  -- VALID or INVALID
   * @example Input JSON
   * ```json
   * {
   *   "message": "This is Test",
   *   "privateKey": "bytes32",
   *   "signature": "bytes96"
   * }
   * ```
   */
  verifyBlsSignature(message, privateKey, signature) {
    // bytes48 -- the public key
    const publicKey = bls.getPublicKey(privateKey.replace(/^0x/, ''));

    // convert message into a hash without 0x.
    const hashWithout0x = keccak256(Buffer.from(message, 'utf-8')).replace(
      /^0x/,
      '',
    );
    return bls.verify(signature, hashWithout0x, publicKey);
  }

  /**
   * A BLS signature aggregation combines a series of signatures into a single signature.
   * @param signatures List[bytes96] -- list of input BLS signatures
   * @returns bytes96 -- Aggregated BLS Signature
   * @example Input JSON
   * ```json
   * {
   *   "signatures": [
   *     "bytes96",
   *     "bytes96",
   *     "bytes96",
   *     ...
   *   ]
   * }
   * ```
   */
  aggregateBlsSignatures(signatures) {
    // console.log(signatures);
    return Buffer.from(bls.aggregateSignatures(signatures)).toString('hex');
  }

  /**
   * Batch verify the signatures against the given pubkeys and messages.
   * @param signature bytes96 -- the signatures to verify against pubkeys and messages
   * @param messages List[bytes32] -- the messages
   * @param privateKeys List[bytes32] --  the private key used for signing
   * @returns bool  -- VALID or INVALID
   * @example Input JSON
   * ```json
   * {
   *   "signature": "bytes96",
   *   "message": [
   *     "plain text",
   *     ...
   *   ],
   *   "privateKeys": [
   *     "bytes32",
   *     ...
   *   ]
   * }
   * ```
   */
  verifyAggregatedBlsSignature(signature, messages, privateKeys) {
    const publicKeys = [],
      hashedMessageWithout0x = [];
    for (let i = 0; i < privateKeys.length; i++) {
      publicKeys[i] = bls.getPublicKey(privateKeys[i].replace(/^0x/, ''));
      // convert message into a hash without 0x.
      hashedMessageWithout0x[i] = keccak256(
        Buffer.from(messages[i], 'utf-8'),
      ).replace(/^0x/, '');
    }

    return bls.verifyBatch(signature, hashedMessageWithout0x, publicKeys);
  }
}
