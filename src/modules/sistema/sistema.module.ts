import { Module } from '@nestjs/common';
import { AuthModule } from './auth';
import { HealthController } from './health/health.controller';

@Module({
  imports: [AuthModule],
  controllers: [HealthController],
  providers: [],
})
export class SistemaModule {}
