import { Test, TestingModule } from '@nestjs/testing';
import { HdWalletController } from './hd-wallet.controller';
import { HdWalletService } from './hd-wallet.service';

describe('HdWalletController', () => {
  let controller: HdWalletController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HdWalletController],
      providers: [HdWalletService],
    }).compile();

    controller = module.get<HdWalletController>(HdWalletController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
