import { Account, Contato, RoleEnum, Servico } from '@prisma/client';
import AccountEntity from './account.entity';

export default class ContatoEntity {
  constructor(params: Partial<ContatoEntity>) {
    Object.assign(this, params);
  }

  public uid: string;
  public criadoEm: Date;
  public atualizadoEm: Date;
  public ativo: boolean;
  public nome: string;
  public telefones: string[];
  public categorias: RoleEnum[];

  public account?: AccountEntity;
  public servicosComoDentista?: Servico[];
  public servicosComoPaciente?: Servico[];

  static fromPrisma(
    contato?: Contato & {
      account?: Account;
      servicosComoDentista?: Servico[];
      servicosComoPaciente?: Servico[];
    },
  ): ContatoEntity | undefined {
    if (!contato) return undefined;
    return new ContatoEntity({
      ...contato,
      account: AccountEntity.fromPrisma(contato.account),
    });
  }
}
