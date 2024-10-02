import { Module } from '@nestjs/common';
import { RollupsService } from './rollups.service';
import { RollupsController } from './rollups.controller';

@Module({
  controllers: [RollupsController],
  providers: [RollupsService],
})
export class RollupsModule {}
