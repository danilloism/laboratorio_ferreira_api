import { Logger, Module } from '@nestjs/common';
import { ContatoModule } from './modules/contato/contato.module';
import { EstoqueModule } from './modules/operacional/estoque/estoque.module';
import { PrestacaoDeServicoModule } from './modules/operacional/prestacao-de-servico/prestacao-de-servico.module';

import { SistemaModule } from './modules/sistema/sistema.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { WinstonModule } from 'nest-winston';

@Module({
  imports: [
    ContatoModule,
    EstoqueModule,
    PrestacaoDeServicoModule,
    SistemaModule,
  ],
  controllers: [],
  providers: [Logger, { provide: APP_FILTER, useClass: HttpExceptionFilter }],
})
export class AppModule {}
