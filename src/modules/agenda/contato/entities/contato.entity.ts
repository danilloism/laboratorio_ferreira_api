import { Exclude, Expose } from 'class-transformer';
import { BaseEntity } from 'src/modules/common/entities/base.entity';
import { Column, Entity, OneToOne } from 'typeorm';
import { CategoriaEnum } from '../enums/categoria.enum';
import { Account } from './account.entity';

@Entity('contato')
export class Contato extends BaseEntity {
  @Column()
  nome: string;

  @Column({ unique: true })
  telefone: string;

  @Column({
    array: true,
    enum: CategoriaEnum,
    type: 'enum',
  })
  categorias: CategoriaEnum[];

  @Exclude()
  @OneToOne(() => Account, account => account.contato, { cascade: ['insert'] })
  account?: Account;

  @Expose()
  get accountId() {
    return this.account?.id;
  }
}
