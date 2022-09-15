import {
  MarcaProduto,
  Produto,
  TipoProduto,
  ValorProduto,
} from '@prisma/client';
import { Exclude } from 'class-transformer';
import { MarcaProdutoEntity } from './marca-produto.entity';
import { TipoProdutoEntity } from './tipo-produto.entity';

export class ProdutoEntity {
  constructor(params?: Partial<ProdutoEntity>) {
    if (params) Object.assign(this, params);
  }

  public uid: string;
  public criadoEm: Date;
  public atualizadoEm: Date;
  public ativo: boolean;
  public nome: string;
  public descricao: string | null;
  public tipo: string;
  public marca: string | null;
  public valores?: ProdutoValores;

  @Exclude()
  public tipoProduto?: TipoProduto;
  @Exclude()
  public marcaProduto?: MarcaProduto;

  public static fromPrisma(
    produto?: Produto & {
      marcaProduto?: MarcaProduto;
      tipoProduto?: TipoProduto;
      valores?: ValorProduto[];
    },
  ): ProdutoEntity | undefined {
    if (!produto) return;

    const valores: ProdutoValores | undefined = produto.valores
      ? {
          espOdont: produto.valores?.find(
            value => value.espOdont && value.ativo,
          ).valorEmCents,
          cliente: produto.valores?.find(
            value => !value.espOdont && value.ativo,
          ).valorEmCents,
        }
      : undefined;
    return new ProdutoEntity({
      ...produto,
      valores,
      marcaProduto: MarcaProdutoEntity.fromPrisma(produto.marcaProduto),
      tipoProduto: TipoProdutoEntity.fromPrisma(produto.tipoProduto),
    });
  }
}

type ProdutoValores = { espOdont: number; cliente: number };
