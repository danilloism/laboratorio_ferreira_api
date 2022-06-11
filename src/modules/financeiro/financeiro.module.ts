import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LancamentoDinheiro } from './entities/lancamento-dinheiro.entity';
import { Parcela } from './entities/parcela.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LancamentoDinheiro, Parcela])],
})
export class FinanceiroModule {}
