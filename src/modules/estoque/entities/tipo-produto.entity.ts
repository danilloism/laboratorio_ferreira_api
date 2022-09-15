import { Produto, TipoProduto } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { ProdutoEntity } from './produto.entity';

export class TipoProdutoEntity {
  constructor(params?: Partial<TipoProdutoEntity>) {
    if (params) Object.assign(this, params);
  }

  public uid: string;
  public criadoEm: Date;
  public atualizadoEm: Date;
  public ativo: boolean;
  public nome: string;
  public descricao: string | null;
  @Exclude()
  public produtos?: ProdutoEntity[];

  public static fromPrisma(
    tipo?: TipoProduto & { produtos?: Produto[] },
  ): TipoProdutoEntity | undefined {
    if (!tipo) return;
    return new TipoProdutoEntity({
      ...tipo,
      produtos: tipo.produtos.map(value => ProdutoEntity.fromPrisma(value)),
    });
  }
}
