import { Usuario } from '@prisma/client';

export type AccountType = Omit<Usuario, 'senha' | 'contatoUid'>;
