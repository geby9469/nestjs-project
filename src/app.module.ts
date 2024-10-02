import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountAbstractionModule } from './account-abstraction/account-abstraction.module';
import { ConfigModule } from '@nestjs/config';
import { RollupsModule } from './rollups/rollups.module';
@Module({
  providers: [AppService],
  controllers: [AppController],
  exports: [],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [__dirname + '/../env/.env.local'],
    }),
    AccountAbstractionModule,
    RollupsModule,
  ],
})
export class AppModule {}
