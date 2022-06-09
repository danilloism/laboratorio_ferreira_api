import { Module } from '@nestjs/common';
import { AuthModule } from './auth';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [],
})
export class SistemaModule {}
