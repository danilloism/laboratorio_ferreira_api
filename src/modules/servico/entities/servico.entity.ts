import { Contato } from '../../agenda/contato/entities/contato.entity';
import { BaseEntity } from '../../common/entities/base.entity';
import { LancamentoFinanceiro } from '../../financeiro/entities/lancamento-financeiro.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ItemServico } from './item-servico.entity';

@Entity()
export class Servico extends BaseEntity {
  @Column({ nullable: true })
  descricao?: string;

  @ManyToOne(() => Contato, { nullable: false, cascade: ['insert'] })
  dentista: Contato;

  @ManyToOne(() => Contato, { cascade: ['insert'] })
  paciente?: Contato;

  @OneToMany(() => ItemServico, item => item.servico, { nullable: false })
  itensServico: ItemServico[];

  @OneToMany(() => LancamentoFinanceiro, lancamento => lancamento.servico, {
    nullable: true,
  })
  lancamentos?: LancamentoFinanceiro[];
}
