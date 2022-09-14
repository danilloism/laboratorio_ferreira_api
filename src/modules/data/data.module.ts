import { Global, Module } from '@nestjs/common';
import { PrismaHealthIndicator } from 'src/modules/data/services/prisma.health-indicator';
import { PrismaService } from 'src/modules/data/services/prisma.service';

@Module({
  providers: [PrismaService, PrismaHealthIndicator],
  exports: [PrismaHealthIndicator, PrismaService],
})
@Global()
export class DataModule {}
