import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LancamentoFinanceiro } from './entities/lancamento-financeiro.entity';
import { Pagamento } from './entities/pagamento.entity';
import { Parcela } from './entities/parcela.entity';
import { LancamentoFinanceiroService } from './services/lancamento-financeiro.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LancamentoFinanceiro, Parcela, Pagamento]),
  ],
  providers: [LancamentoFinanceiroService],
})
export class FinanceiroModule {}
