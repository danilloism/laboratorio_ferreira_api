import { BaseEntity } from '../../common/entities/base.entity';
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { StatusPagamentoEnum } from '../enums/status-pagamento.enum';
import { LancamentoFinanceiro } from './lancamento-financeiro.entity';
import { Pagamento } from './pagamento.entity';

@Entity()
export class Parcela extends BaseEntity {
  @Column()
  valor: number;

  @Column({ default: 1 })
  numParcela: number;

  @Column({ nullable: true })
  desconto?: number;

  @Column({ nullable: true })
  multa?: number;

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

  @OneToOne(() => Pagamento, pgmnt => pgmnt.parcela, { nullable: true })
  pagamento?: Pagamento;
}
