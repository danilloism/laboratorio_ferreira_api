import { Module } from '@nestjs/common';
import { EstoqueModule } from './estoque/estoque.module';
import { ServicoModule } from './servico/servico.module';
import { CaixaModule } from './caixa/caixa.module';

@Module({
  imports: [EstoqueModule, ServicoModule, CaixaModule],
})
export class OperacionalModule {}
