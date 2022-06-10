import { Exclude, Expose } from 'class-transformer';
import { BaseEntity } from '../../../../common/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Produto } from './produto.entity';

@Entity('valor_produto')
export class ValorProduto extends BaseEntity {
  @Column({ name: 'esp_odont' })
  espOdont: boolean;

  @Column()
  valor: number;

  @Column({ name: 'dt_fim', nullable: true })
  dtFim?: Date;

  @Exclude()
  @ManyToOne(() => Produto, produto => produto.historicoValores)
  produto: Produto;

  @Expose()
  get produtoId() {
    return this.produto?.id;
  }
}
