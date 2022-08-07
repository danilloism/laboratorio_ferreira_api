import { MarcaProduto } from '@prisma/client';

export class MarcaProdutoEntity implements MarcaProduto {
  uid: string;
  criadoEm: Date;
  atualizadoEm: Date;
  ativo: boolean;
  nome: string;
  descricao: string | null;
}
