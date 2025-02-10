import { Injectable } from '@nestjs/common';
import { CreateHdWalletDto } from './dto/create-hd-wallet.dto';
import { UpdateHdWalletDto } from './dto/update-hd-wallet.dto';
import { ethers, getAccountPath, Mnemonic, randomBytes } from 'ethers';
import { bls12_381 as bls } from '@noble/curves/bls12-381';

@Injectable()
export class HdWalletService {
  create(createHdWalletDto: CreateHdWalletDto) {
    return 'This action adds a new hdWallet';
  }

  createBLS(): string {
    const privateKey: Uint8Array = bls.utils.randomPrivateKey();
    // console.log(privateKey);

    // const publicKey: Uint8Array = bls.getPublicKey(privateKey);
    // console.log(publicKey);

    const message: Uint8Array = new TextEncoder().encode('BLS signature');
    // console.log(message);

    // 96 bytes BLS.
    const signature: Uint8Array = bls.sign(message, privateKey);
    const strSignature: string = Buffer.from(signature).toString('hex');
    console.log(strSignature);

    // TODO: Verify BLS.
    // const isValid: boolean = bls.verify(signature, message, publicKey);
    // console.log(isValid);
    return strSignature;
  }

  aggregateBSL(): string {
    // TODO: TSS
    const privateKeys: Uint8Array[] = new Array(3);
    for (let i = 0; i < 3; i++) {
      privateKeys.push(bls.utils.randomPrivateKey());
    }
    // console.log(privateKeys);

    // const publicKeys: Uint8Array[] = privateKeys.map((pk) =>
    //   bls.getPublicKey(pk),
    // );
    // console.log(publicKeys);

    const message: Uint8Array = new TextEncoder().encode('BLS signatures');

    const signatures: Uint8Array[] = privateKeys.map((pk) =>
      bls.sign(message, pk),
    );
    // console.log(signatures);

    const aggregatedSignature: Uint8Array = bls.aggregateSignatures(signatures);
    const strAggregatedSignature: string =
      Buffer.from(aggregatedSignature).toString('hex');
    console.log(strAggregatedSignature);

    // TODO: Verify BLS signatures.
    // const aggregatedPublicKey: Uint8Array = bls.aggregatePublicKeys(publicKeys);
    // const isValid = bls.verify(
    //   aggregatedSignature,
    //   message,
    //   aggregatedPublicKey,
    // );
    // console.log(isValid);
    return strAggregatedSignature;
  }

  findAll() {
    // create a HD wallet.
    // const wallet = ethers.Wallet.createRandom();
    // console.log(wallet);

    // // recover the wallet using mnemonic code
    // const recoveredHDWallet = ethers.Wallet.fromPhrase(
    //   'inner rack under input must inner smoke sweet error narrow parade client',
    // );
    // console.log(recoveredHDWallet);

    // // generates a seed(64-byte number) from mnemonic code. convert mnemonic code into the seed.
    // const seed = recoveredHDWallet.mnemonic.computeSeed();
    // console.log(seed);

    // // create accounts
    // // TODO: Register issue in ethers.js https://github.com/ethers-io/ethers.js/issues/4848
    // const account1 = recoveredHDWallet.derivePath("m/44'/60'/0'/0/1");
    // console.log(account1);

    // test 1
    // // create a HD wallet.
    // const wallet = ethers.Wallet.createRandom();
    // console.log(wallet);

    // // and then I want to derive path from the wallet.
    // const account1 = wallet.derivePath('1');
    // console.log(account1);

    // // OR just derive child
    // const account2 = wallet.deriveChild(1);
    // console.log(account2);

    // test 2
    const mnemonic = Mnemonic.fromPhrase(
      'inner rack under input must inner smoke sweet error narrow parade client',
    );
    console.log(mnemonic);
    const path = `m/44'/60'/0'/0/1`;
    const hdWallet = ethers.HDNodeWallet.fromMnemonic(mnemonic!, path);
    console.log(hdWallet);

    // test 3: hd wallet with depth-zero.
    // Create a root wallet (this will have no mnemonic as a seed cannot be reversed)
    const seed = randomBytes(16);
    console.log(seed);
    const root = ethers.HDNodeWallet.fromSeed(seed);
    console.log(root);

    // Create a root wallet with a mnemonic
    const root2 = ethers.HDNodeWallet.createRandom(null, 'm');
    console.log(root2);

    // Derive account 1:
    const account1 = root2.derivePath(getAccountPath(1));
    console.log(account1);

    return true;
  }

  findOne(id: number) {
    return `This action returns a #${id} hdWallet`;
  }

  update(id: number, updateHdWalletDto: UpdateHdWalletDto) {
    return `This action updates a #${id} hdWallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} hdWallet`;
  }
}
