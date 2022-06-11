import { Contato } from '../../agenda/contato/entities/contato.entity';
import { BaseEntity } from '../../common/entities/base.entity';
import { Servico } from '../../servico/entities/servico.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { FinalidadeSaidaEnum } from '../enums/finalidade-saida.enum';
import { Parcela } from './parcela.entity';
import { FluxoPagamentoEnum } from '../enums/fluxo-pagamento.enum';

@Entity()
export class LancamentoDinheiro extends BaseEntity {
  @Column()
  numParcelas: number;

  @Column()
  dtLancamento: Date;

  @Column({ nullable: true })
  dtPrimeiroVencimento?: Date;

  @Column({ nullable: true })
  intervaloEntreParcelas?: number;

  @Column({ nullable: true })
  finalidadeSaida?: FinalidadeSaidaEnum;

  @ManyToOne(() => Contato, contato => contato.lancamentosRecebidos, {
    nullable: true,
  })
  paraQuem?: Contato;

  @Column({ nullable: true })
  descricao?: string;

  @Column()
  fluxo: FluxoPagamentoEnum;

  @ManyToOne(() => Servico, servico => servico.lancamentos, { nullable: true })
  servico?: Servico;

  @OneToMany(() => Parcela, parcela => parcela.lancamento, { nullable: false })
  parcelas: Parcela[];
}
