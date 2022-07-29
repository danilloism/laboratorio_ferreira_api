import { Contato } from '@prisma/client';
import { AccountType } from './account.type';

export type ContatoType = Omit<Contato, 'usuario'> & { usuario: AccountType };
