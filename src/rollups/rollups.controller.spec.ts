import { Test, TestingModule } from '@nestjs/testing';
import { RollupsController } from './rollups.controller';
import { RollupsService } from './rollups.service';

describe('RollupsController', () => {
  let controller: RollupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RollupsController],
      providers: [RollupsService],
    }).compile();

    controller = module.get<RollupsController>(RollupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
