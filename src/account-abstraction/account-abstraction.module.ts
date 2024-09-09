import { Module } from '@nestjs/common';
import { AccountAbstractionService } from './account-abstraction.service';
import { AccountAbstractionController } from './account-abstraction.controller';

@Module({
  controllers: [AccountAbstractionController],
  providers: [AccountAbstractionService],
})
export class AccountAbstractionModule {}
