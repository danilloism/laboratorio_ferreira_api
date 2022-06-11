import { Contato } from '../../agenda/contato/entities/contato.entity';
import { BaseEntity } from '../../common/entities/base.entity';
import { LancamentoDinheiro } from '../../financeiro/entities/lancamento-dinheiro.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ItemServico } from './item-servico.entity';

@Entity()
export class Servico extends BaseEntity {
  @Column({ nullable: true })
  descricao?: string;

  @ManyToOne(() => Contato, { nullable: false })
  dentista: Contato;

  @ManyToOne(() => Contato)
  paciente?: Contato;

  @OneToMany(() => ItemServico, item => item.servico, { nullable: false })
  itensServico: ItemServico[];

  @OneToMany(() => LancamentoDinheiro, lancamento => lancamento.servico, {
    nullable: true,
  })
  lancamentos?: LancamentoDinheiro[];
}
