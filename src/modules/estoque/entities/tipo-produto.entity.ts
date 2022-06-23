import { BaseEntity } from '../../common/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Produto } from './produto.entity';

@Entity()
export class TipoProduto extends BaseEntity {
  @Column({ unique: true })
  nome: string;

  @Column({ nullable: true, length: 300 })
  descricao?: string;

  @OneToMany(() => Produto, produto => produto.tipoProduto)
  produtos: Produto[];
}
