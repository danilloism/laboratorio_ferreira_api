import { Exclude, Expose } from 'class-transformer';
import { BaseEntity } from '../../common/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Produto } from './produto.entity';
import { CurrencyHelper } from 'src/modules/common/helpers/currency.helper';
import currency from 'currency.js';

@Entity()
export class ValorProduto extends BaseEntity {
  @Column()
  espOdont: boolean;

  @Column({ transformer: CurrencyHelper.entityTransformer, type: 'int' })
  valor: currency;

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
