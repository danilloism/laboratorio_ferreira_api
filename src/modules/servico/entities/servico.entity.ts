import { Contato } from 'src/modules/agenda/contato/entities/contato.entity';
import { BaseEntity } from 'src/modules/common/entities/base.entity';
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
}
