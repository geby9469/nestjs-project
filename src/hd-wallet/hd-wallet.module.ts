import { Module } from '@nestjs/common';
import { HdWalletService } from './hd-wallet.service';
import { HdWalletController } from './hd-wallet.controller';

@Module({
  controllers: [HdWalletController],
  providers: [HdWalletService],
})
export class HdWalletModule {}
