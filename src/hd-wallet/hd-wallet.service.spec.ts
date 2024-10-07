import { Test, TestingModule } from '@nestjs/testing';
import { HdWalletService } from './hd-wallet.service';

describe('HdWalletService', () => {
  let service: HdWalletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HdWalletService],
    }).compile();

    service = module.get<HdWalletService>(HdWalletService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
