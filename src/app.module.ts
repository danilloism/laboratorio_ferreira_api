import { Module } from '@nestjs/common';
import { AgendaModule } from './modules/agenda/agenda.module';
import { EstoqueModule } from './modules/operacional/estoque/estoque.module';
import { PrestacaoDeServicoModule } from './modules/operacional/prestacao-de-servico/prestacao-de-servico.module';

import { SistemaModule } from './modules/sistema/sistema.module';

@Module({
  imports: [
    AgendaModule,
    EstoqueModule,
    PrestacaoDeServicoModule,
    SistemaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
