import { Exclude, Expose } from 'class-transformer';
import { BaseEntity } from '../../common/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Produto } from './produto.entity';

@Entity()
export class ValorProduto extends BaseEntity {
  @Column()
  espOdont: boolean;

  @Column()
  valor: number;

  @Column({ nullable: true })
  dtFim?: Date;

  @Exclude()
  @ManyToOne(() => Produto, produto => produto.historicoValores, {
    nullable: false,
  })
  produto: Produto;

  @Expose()
  get produtoId() {
    return this.produto?.id;
  }
}
