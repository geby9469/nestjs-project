import { Test, TestingModule } from '@nestjs/testing';
import { AccountAbstractionController } from './account-abstraction.controller';
import { AccountAbstractionService } from './account-abstraction.service';

describe('AccountAbstractionController', () => {
  let controller: AccountAbstractionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountAbstractionController],
      providers: [AccountAbstractionService],
    }).compile();

    controller = module.get<AccountAbstractionController>(AccountAbstractionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
