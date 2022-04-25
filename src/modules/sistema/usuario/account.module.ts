import { forwardRef, Module } from '@nestjs/common';
import { AuthModule, JwtAuthGuard } from '../auth';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [AccountController],
  providers: [AccountService, JwtAuthGuard],
  exports: [AccountService],
})
export class AccountModule {}
