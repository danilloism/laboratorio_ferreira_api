import { BaseEntity } from '../../common/entities/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { StatusPagamentoEnum } from '../enums/status-pagamento.enum';
import { LancamentoFinanceiro } from './lancamento-financeiro.entity';
import { Pagamento } from './pagamento.entity';
import { CurrencyHelper } from 'src/modules/common/helpers/currency.helper';
import currency from 'currency.js';

@Entity()
export class Parcela extends BaseEntity {
  @Column({ transformer: CurrencyHelper.entityTransformer, type: 'int' })
  valor: currency;

  @Column({ default: 1 })
  numParcela: number;

  @ManyToOne(() => LancamentoFinanceiro, lancamento => lancamento.parcelas, {
    nullable: false,
  })
  lancamento: LancamentoFinanceiro;

  @Column({
    enum: StatusPagamentoEnum,
    type: 'enum',
    enumName: 'status_pagamento',
  })
  status: StatusPagamentoEnum;

  @OneToMany(() => Pagamento, pgmnt => pgmnt.parcela, { nullable: true })
  pagamentos?: Pagamento[];
}
