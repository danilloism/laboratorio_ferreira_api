import { Logger, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AgendaModule } from './modules/agenda/agenda.module';
import { OperacionalModule } from './modules/operacional/operacional.module';
import { JwtAuthGuard } from './modules/sistema/auth';
import { SistemaModule } from './modules/sistema/sistema.module';

@Module({
  imports: [SistemaModule, AgendaModule, OperacionalModule],
  controllers: [],
  providers: [Logger, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
