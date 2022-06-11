import { Exclude } from 'class-transformer';
import { BaseEntity } from '../../common/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Produto } from './produto.entity';

@Entity('tipo_produto')
export class TipoProduto extends BaseEntity {
  @Column({ unique: true })
  nome: string;

  @Column({ nullable: true })
  descricao?: string;

  @OneToMany(() => Produto, produto => produto.tipoProduto)
  produtos: Produto[];
}
