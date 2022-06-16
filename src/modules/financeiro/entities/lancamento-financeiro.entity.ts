import { Contato } from '../../agenda/contato/entities/contato.entity';
import { BaseEntity } from '../../common/entities/base.entity';
import { Servico } from '../../servico/entities/servico.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { FinalidadeSaidaEnum } from '../enums/finalidade-saida.enum';
import { Parcela } from './parcela.entity';
import { FluxoPagamentoEnum } from '../enums/fluxo-pagamento.enum';
import { CurrencyHelper } from 'src/modules/common/helpers/currency.helper';
import currency from 'currency.js';

@Entity()
export class LancamentoFinanceiro extends BaseEntity {
  @Column({ default: 1 })
  numParcelas: number;

  @Column({ default: new Date() })
  dtLancamento: Date;

  @Column({ nullable: true })
  dtPrimeiroVencimento?: Date;

  @Column({ nullable: true })
  intervaloEntreParcelas?: number;

  @Column({
    nullable: true,
    transformer: CurrencyHelper.entityTransformer,
    type: 'int',
  })
  valorEntrada?: currency;

  @Column({
    nullable: true,
    enum: FinalidadeSaidaEnum,
    type: 'enum',
    enumName: 'finalidade_saida',
  })
  finalidadeSaida?: FinalidadeSaidaEnum;

  @ManyToOne(() => Contato, contato => contato.lancamentosRecebidos, {
    nullable: true,
  })
  paraQuem?: Contato;

  @Column({ nullable: true, length: 300 })
  descricao?: string;

  @Column({
    enum: FluxoPagamentoEnum,
    type: 'enum',
    enumName: 'fluxo_pagamento',
  })
  fluxo: FluxoPagamentoEnum;

  @ManyToOne(() => Servico, servico => servico.lancamentos, { nullable: true })
  servico?: Servico;

  @OneToMany(() => Parcela, parcela => parcela.lancamento, {
    nullable: false,
    eager: true,
  })
  parcelas: Parcela[];
}
