import { TipoProduto } from '@prisma/client';

export class MarcaProdutoEntity implements TipoProduto {
  uid: string;
  criadoEm: Date;
  atualizadoEm: Date;
  ativo: boolean;
  nome: string;
  descricao: string | null;
}
