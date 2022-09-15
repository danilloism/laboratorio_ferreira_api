import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { DataModule } from '../data/data.module';
import { HealthController } from './health.controller';

@Module({
  imports: [TerminusModule, HttpModule, DataModule],
  providers: [],
  controllers: [HealthController],
})
export class HealthModule {}
