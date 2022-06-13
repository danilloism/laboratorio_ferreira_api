import { Exclude, Expose } from 'class-transformer';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { CategoriaEnum } from '../enums/categoria.enum';
import { Account } from './account.entity';
import { Servico } from '../../../servico/entities/servico.entity';
import { LancamentoFinanceiro } from '../../../financeiro/entities/lancamento-financeiro.entity';

@Entity()
export class Contato extends BaseEntity {
  @Column()
  nome: string;

  @Column({ unique: true })
  telefone: string;

  @Column({
    array: true,
    enum: CategoriaEnum,
    type: 'enum',
    enumName: 'categoria',
  })
  categorias: CategoriaEnum[];

  @Exclude()
  @OneToOne(() => Account, account => account.contato, {
    cascade: ['insert'],
    nullable: true,
  })
  account?: Account;

  @Exclude()
  @OneToMany(() => Servico, servico => servico.dentista)
  servicosComoDentista: Servico[];

  @Exclude()
  @OneToMany(() => Servico, servico => servico.paciente)
  servicosComoPaciente: Servico[];

  @OneToMany(() => LancamentoFinanceiro, lancamento => lancamento.paraQuem)
  lancamentosRecebidos: LancamentoFinanceiro[];

  @Expose()
  get accountId() {
    return this.account?.id;
  }
}
