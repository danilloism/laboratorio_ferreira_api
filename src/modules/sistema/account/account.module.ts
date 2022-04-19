import { Global, Module } from '@nestjs/common';
import { SharedModule } from '../../shared/shared.module';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Global()
@Module({
  imports: [SharedModule],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
