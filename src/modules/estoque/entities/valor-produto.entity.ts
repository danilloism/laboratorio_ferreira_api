import { ValorProduto } from '@prisma/client';

export class ValorProdutoEntity implements ValorProduto {
  uid: string;
  criadoEm: Date;
  atualizadoEm: Date;
  ativo: boolean;
  espOdont: boolean;
  valorEmCents: number;
  dtFim: Date | null;
  produtoUid: string;
}
