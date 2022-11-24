import { Account, Contato } from '@prisma/client';
import { Exclude } from 'class-transformer';
import ContatoEntity from './contato.entity';

export default class AccountEntity {
  constructor(params?: Partial<AccountEntity>) {
    if (params) Object.assign(this, params);
  }

  public criadoEm: Date;
  public atualizadoEm: Date;
  public email: string;

  @Exclude()
  public contatoUid: string;
  @Exclude()
  public senha: string;

  public contato?: ContatoEntity;

  static fromPrisma(
    account?: Account & { contato?: Contato },
  ): AccountEntity | undefined {
    if (!account) return;

    return new AccountEntity({
      ...account,
      contato: ContatoEntity.fromPrisma(account.contato),
    });
  }
}
