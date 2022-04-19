import {
  DefaultEntity,
  DefaultEntityWithId,
} from 'src/shared/entities/default.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { ValorProduto } from './valor-produto.entity';

@Entity()
export class Produto extends DefaultEntityWithId {
  @Column({ nullable: false })
  nome: string;

  @Column({ nullable: true })
  descricao: string;

  @Column('enum', {
    nullable: false,
    enum: ['ppr', 'pt', 'pino', 'restauracao'],
  })
  tipo: string;

  // @OneToMany(() => ValorProduto, (valor) => valor, {
  //   nullable: false,
  // })
  // precos: ValorProduto[];
}
