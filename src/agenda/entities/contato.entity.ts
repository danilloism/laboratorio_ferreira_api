import { DefaultEntityWithId } from '../../shared/entities/default.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { CategoriaContato } from '../enums/categoria-contato.enum';
import { ForeignKeyMetadata } from 'typeorm/metadata/ForeignKeyMetadata';

@Entity()
export class Contato extends DefaultEntityWithId {
  @Column({ length: 80, nullable: false })
  nome: string;

  // @OneToMany(() => Telefone, (telefone) => telefone.contatoId)
  // telefones: Telefone[];

  @Column({ enum: CategoriaContato, nullable: false })
  categoria: CategoriaContato;

  @Column({ nullable: false, default: false })
  usaEspOdont: boolean;
}

@Entity()
export class Usuario {
  @OneToOne(() => Contato, { cascade: true })
  @JoinColumn({ name: 'id' })
  contato: Contato;

  @Column({ unique: true, nullable: true })
  username: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: true })
  senha: string;
}
