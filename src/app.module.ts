import { Module } from '@nestjs/common';
import { AgendaModule } from './modules/agenda/agenda.module';
import { EstoqueModule } from './modules/operacional/estoque/estoque.module';
import { PrestacaoDeServicoModule } from './modules/operacional/prestacao-de-servico/prestacao-de-servico.module';
import { SharedModule } from './modules/shared/shared.module';

import { SistemaModule } from './modules/sistema/sistema.module';

@Module({
  imports: [
    AgendaModule,
    EstoqueModule,
    PrestacaoDeServicoModule,
    SistemaModule,
    SharedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
