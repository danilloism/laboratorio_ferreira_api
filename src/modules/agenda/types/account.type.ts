import { Account } from '@prisma/client';

export type AccountType = Omit<Account, 'senha'>;
