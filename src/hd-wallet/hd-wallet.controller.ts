import { Controller, Get, Post, Body } from '@nestjs/common';
import { HdWalletService } from './hd-wallet.service';

@Controller('hd-wallet')
export class HdWalletController {
  constructor(private readonly hdWalletService: HdWalletService) {}

  @Get()
  getHdWallet() {
    return this.hdWalletService.getHdWallet();
  }

  @Get('privatekey')
  getPrivateKeyOfHdWallet() {
    return this.hdWalletService.getPrivateKeyOfHdWallet();
  }

  @Post('child')
  createChildHdWallet(@Body() dto) {
    return this.hdWalletService.createChildHdWallet(dto);
  }

  // TODO: WIP 🚧. SHOULD be managed child wallet.
  // @Get('child')
  // getChildHdWallet() {
  //   return this.hdWalletService.getChildHdWallet();
  // }

  @Post('bls')
  createBlsSignature(@Body() dto) {
    return this.hdWalletService.createBlsSignature(dto.message, dto.privateKey);
  }

  @Post('bls/verification')
  verifyBlsSignature(@Body() dto) {
    return this.hdWalletService.verifyBlsSignature(
      dto.message,
      dto.privateKey,
      dto.signature,
    );
  }

  @Post('bls/aggregation')
  aggregateBLS(@Body() dto) {
    return this.hdWalletService.aggregateBlsSignatures(dto.signatures);
  }

  @Post('bls/aggregation/verification')
  verifyAggregatedBlsSignature(@Body() dto) {
    return this.hdWalletService.verifyAggregatedBlsSignature(
      dto.signature,
      dto.messages,
      dto.privateKeys,
    );
  }
}
