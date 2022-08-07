import { Module } from '@nestjs/common';
import { PrismaService } from '../data/services/prisma.service';
import { LancamentoFinanceiroService } from './services/lancamento-financeiro.service';

@Module({
  imports: [],
  providers: [PrismaService, LancamentoFinanceiroService],
})
export class FinanceiroModule {}
