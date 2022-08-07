import { Produto } from '@prisma/client';

export class ProdutoEntity implements Produto {
  uid: string;
  criadoEm: Date;
  atualizadoEm: Date;
  ativo: boolean;
  nome: string;
  descricao: string | null;
  tipo: string;
  marca: string | null;
}
