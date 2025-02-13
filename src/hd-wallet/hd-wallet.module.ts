import { Module } from '@nestjs/common';
import { HdWalletService } from './hd-wallet.service';
import { HdWalletController } from './hd-wallet.controller';
import { HDNodeWallet } from 'ethers';

@Module({
  controllers: [HdWalletController],
  providers: [
    HdWalletService,
    // TODO: What if a server shuts down, and the wallet is initialised.
    {
      provide: 'HD_WALLET',
      useFactory: () => {
        return HDNodeWallet.createRandom(null, "m/44'");
      },
    },
  ],
})
export class HdWalletModule {}
