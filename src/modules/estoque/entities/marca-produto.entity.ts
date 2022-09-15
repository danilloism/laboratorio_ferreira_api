import { MarcaProduto, Produto } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { ProdutoEntity } from './produto.entity';

export class MarcaProdutoEntity {
  constructor(params?: Partial<MarcaProdutoEntity>) {
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
    marca?: MarcaProduto & { produtos?: Produto[] },
  ): MarcaProdutoEntity | undefined {
    if (!marca) return;
    return new MarcaProdutoEntity({
      ...marca,
      produtos: marca.produtos.map(value => ProdutoEntity.fromPrisma(value)),
    });
  }
}
