import { BaseEntity } from '../../common/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Produto } from './produto.entity';

@Entity('marca_produto')
export class MarcaProduto extends BaseEntity {
  @Column({ unique: true })
  nome: string;

  @Column({ nullable: true })
  descricao?: string;

  @OneToMany(() => Produto, produto => produto.marcaProduto)
  produtos: Produto[];
}
