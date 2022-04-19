import { DefaultEntity } from 'src/shared/entities/default.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Produto } from './produto.entity';

@Entity()
export class ValorProduto extends DefaultEntity {
  @ManyToOne(() => Produto, produto => produto.id, {
    nullable: false,
  })
  produtoId: string;

  @PrimaryColumn({ nullable: false })
  espOdont: boolean;

  @Column({ nullable: false })
  valor: number;

  @Column({ nullable: true })
  dtFim: Date;
}
