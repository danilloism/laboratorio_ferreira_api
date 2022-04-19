import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { PrismaModule } from './prisma';
import { AuthModule } from './auth';

@Module({
  imports: [AuthModule, AccountModule, PrismaModule],
  providers: [],
})
export class SistemaModule {}
