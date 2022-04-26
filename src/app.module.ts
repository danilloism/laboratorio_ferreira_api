import { Logger, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AgendaModule } from './modules/agenda/agenda.module';
import { OperacionalModule } from './modules/operacional/operacional.module';
import { SistemaModule } from './modules/sistema/sistema.module';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';

@Module({
  imports: [SistemaModule, AgendaModule, OperacionalModule],
  controllers: [],
  providers: [Logger, { provide: APP_FILTER, useClass: HttpExceptionFilter }],
})
export class AppModule {}
