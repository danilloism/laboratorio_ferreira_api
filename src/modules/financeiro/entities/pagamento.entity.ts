import { BaseEntity } from 'src/modules/common/entities/base.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Parcela } from './parcela.entity';

@Entity()
export class Pagamento extends BaseEntity {
  @OneToOne(() => Parcela, parcela => parcela.pagamento, { nullable: false })
  @JoinColumn()
  parcela: Parcela;

  @Column({ nullable: true, default: new Date() })
  dt: Date;

  @Column()
  valor: number;
}
