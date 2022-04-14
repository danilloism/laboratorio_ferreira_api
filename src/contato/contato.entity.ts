import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Contato {
  @PrimaryGeneratedColumn()
  codigo: string;

  @Column()
  nome: string;

  @Column()
  telefone: string;
}
