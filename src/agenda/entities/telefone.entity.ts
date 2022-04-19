import { DefaultEntity } from '../../shared/entities/default.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Contato } from './contato.entity';

@Entity()
export class Telefone extends DefaultEntity {
  @PrimaryColumn({ nullable: false })
  numero: number;

  @ManyToOne(() => Contato, contato => contato.id, { nullable: false })
  contato: string;

  @PrimaryColumn({ nullable: false })
  @Column({ nullable: true })
  ddd: number;
}
