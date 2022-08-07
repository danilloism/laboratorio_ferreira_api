import { Contato, Servico } from '@prisma/client';
import { AccountType } from './account.type';

export type ContatoType = Omit<Contato, 'account'> & {
  account?: AccountType;
  servicosComoDentista?: Servico[];
  servicosComoPaciente?: Servico[];
};
