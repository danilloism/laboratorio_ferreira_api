import { Exclude } from 'class-transformer';
import { BaseEntity } from '../../common/entities/base.entity';
import { Produto } from '../../estoque/entities/produto.entity';
import { Column, Entity, ManyToOne, Unique } from 'typeorm';
import { EtapaFabricacao } from './etapa-fabricacao.entity';
import { Servico } from './servico.entity';
import { CurrencyHelper } from 'src/modules/common/helpers/currency.helper';
import currency from 'currency.js';

@Entity()
@Unique(['produto', 'servico'])
export class ItemServico extends BaseEntity {
  @Column({ default: 1 })
  quantidade: number;

  @Column({
    nullable: true,
    transformer: CurrencyHelper.entityTransformer,
    type: 'int',
  })
  desconto?: currency;

  @Column({
    nullable: true,
    transformer: CurrencyHelper.entityTransformer,
    type: 'int',
  })
  multa?: currency;

  /*----------- Relações -----------*/

  @Exclude()
  @ManyToOne(() => Servico, servico => servico.itensServico, {
    nullable: false,
    eager: true,
  })
  servico: Servico;

  @Exclude()
  @ManyToOne(() => Produto, produto => produto.itensServico, {
    nullable: false,
    eager: true,
  })
  produto: Produto;

  @Exclude()
  @ManyToOne(() => EtapaFabricacao, etapa => etapa.itensServico, {
    nullable: false,
    eager: true,
  })
  etapaFabricacao: EtapaFabricacao;

  /*----------- Campos da API -----------*/

  get servicoId() {
    return this.servico.id;
  }

  get produtoId() {
    return this.produto.id;
  }

  get etapa() {
    return this.etapaFabricacao.nome;
  }
}
