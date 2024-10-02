import { Test, TestingModule } from '@nestjs/testing';
import { RollupsService } from './rollups.service';

describe('RollupsService', () => {
  let service: RollupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RollupsService],
    }).compile();

    service = module.get<RollupsService>(RollupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
