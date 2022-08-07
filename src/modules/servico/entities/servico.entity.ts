import { Servico } from '@prisma/client';

export class ServicoEntity implements Servico {
  uid: string;
  criadoEm: Date;
  atualizadoEm: Date;
  ativo: boolean;
  dentistaUid: string;
  descricao: string | null;
  observacoes: string | null;
  espOdont: boolean;
}
