import { Exclude, Expose } from 'class-transformer';
import { BaseEntity } from '../../common/entities/base.entity';
import { Column, Entity, ManyToOne, OneToMany, Unique } from 'typeorm';
import { MarcaProduto } from './marca-produto.entity';
import { TipoProduto } from './tipo-produto.entity';
import { ValorProduto } from './valor-produto.entity';
import { ItemServico } from '../../servico/entities/item-servico.entity';

@Entity()
@Unique(['nome', 'tipoProduto', 'marcaProduto'])
export class Produto extends BaseEntity {
  @Column()
  nome: string;

  @Column({ nullable: true, length: 300 })
  descricao?: string;

  @Exclude()
  @ManyToOne(() => TipoProduto, tipo => tipo.produtos, {
    cascade: ['insert'],
    eager: true,
    nullable: false,
  })
  tipoProduto: TipoProduto;

  @Exclude()
  @ManyToOne(() => MarcaProduto, marca => marca.produtos, {
    nullable: true,
    cascade: ['insert'],
    eager: true,
  })
  marcaProduto?: MarcaProduto;

  @Exclude()
  @OneToMany(() => ValorProduto, valor => valor.produto, {
    cascade: ['insert'],
    eager: true,
  })
  historicoValores: ValorProduto[];

  @Exclude()
  @OneToMany(() => ItemServico, item => item.produto)
  itensServico: ItemServico[];

  @Expose()
  get tipo() {
    return this.tipoProduto.nome;
  }

  @Expose()
  get marca() {
    return this.marcaProduto?.nome;
  }

  @Expose()
  get valor() {
    const espOdont = this.historicoValores.find(
      valor => valor.ativo && valor.espOdont,
    );
    const cliente = this.historicoValores.find(
      valor => valor.ativo && !valor.espOdont,
    );
    return { espOdont: espOdont.valor, cliente: cliente.valor };
  }
}
