import currency from 'currency.js';
import { BaseEntity } from 'src/modules/common/entities/base.entity';
import { CurrencyHelper } from 'src/modules/common/helpers/currency.helper';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Parcela } from './parcela.entity';

@Entity()
export class Pagamento extends BaseEntity {
  @ManyToOne(() => Parcela, parcela => parcela.pagamentos, { nullable: false })
  parcela: Parcela;

  @Column({ nullable: true, default: new Date() })
  dt: Date;

  @Column({ transformer: CurrencyHelper.entityTransformer, type: 'int' })
  valor: currency;
}
