import { Exclude, Expose } from 'class-transformer';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Contato } from './contato.entity';

@Entity()
export class Account extends BaseEntity {
  @Column({ unique: true, length: 254 })
  email: string;

  @Column({ nullable: true, unique: true, length: 64 })
  username: string;

  @Exclude()
  @Column({ length: 200, type: 'varchar' })
  senha: string;

  @Exclude()
  @OneToOne(() => Contato, contato => contato.account, {
    eager: true,
    nullable: false,
  })
  @JoinColumn()
  contato: Contato;

  @Expose()
  get contatoId() {
    return this.contato.id;
  }
}
