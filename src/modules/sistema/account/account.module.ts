import { forwardRef, Global, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthModule, AuthService, JwtAuthGuard } from '../auth';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [AccountController],
  providers: [AccountService, JwtAuthGuard],
  exports: [AccountService],
})
export class AccountModule {}
