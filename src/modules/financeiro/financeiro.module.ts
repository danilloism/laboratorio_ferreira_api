import { Module } from '@nestjs/common';
import { LancamentoFinanceiroService } from './services/lancamento-financeiro.service';

@Module({
	providers: [ LancamentoFinanceiroService ],
})
export class FinanceiroModule {}
