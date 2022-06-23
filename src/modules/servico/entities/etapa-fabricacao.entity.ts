import { Exclude } from 'class-transformer';
import { BaseEntity } from '../../common/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { ItemServico } from './item-servico.entity';

@Entity()
export class EtapaFabricacao extends BaseEntity {
  @Column({ unique: true })
  nome: string;

  @Column({ nullable: true, length: 300 })
  descricao?: string;

  @Exclude()
  @OneToMany(() => ItemServico, item => item.etapaFabricacao)
  itensServico: ItemServico[];
}
