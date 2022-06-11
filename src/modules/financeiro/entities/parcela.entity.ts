import { BaseEntity } from '../../common/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { StatusPagamentoEnum } from '../enums/status-pagamento.enum';
import { LancamentoDinheiro } from './lancamento-dinheiro.entity';

@Entity()
export class Parcela extends BaseEntity {
  @Column()
  valor: number;

  @Column({ default: 1 })
  numParcela: number;

  @Column({ nullable: true })
  dtPagamento?: Date;

  @Column({ nullable: true })
  desconto?: number;

  @Column({ nullable: true })
  multa?: number;

  @Column({ nullable: true })
  valorPago: number;

  @ManyToOne(() => LancamentoDinheiro, lancamento => lancamento.parcelas, {
    nullable: false,
  })
  lancamento: LancamentoDinheiro;

  @Column()
  status: StatusPagamentoEnum;
}
