import { Exclude, Expose } from 'class-transformer';
import { BaseEntity } from 'src/modules/common/entities/base.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Contato } from './contato.entity';

@Entity('account')
export class Account extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column({ nullable: true, unique: true })
  username: string;

  @Exclude()
  @Column()
  senha: string;

  @Exclude()
  @OneToOne(() => Contato, contato => contato.account)
  @JoinColumn()
  contato: Contato;

  @Expose()
  get contatoId() {
    return this.contato?.id;
  }
}
