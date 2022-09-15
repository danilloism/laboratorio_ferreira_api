import { Account, Contato, RoleEnum, Servico } from '@prisma/client';
import { Exclude } from 'class-transformer';
import AccountEntity from './account.entity';

export default class ContatoEntity {
  constructor(params?: Partial<ContatoEntity>) {
    if (params) Object.assign(this, params);
  }

  public uid: string;
  public criadoEm: Date;
  public atualizadoEm: Date;
  public ativo: boolean;
  public nome: string;
  public telefones: string[];
  public categorias: RoleEnum[];

  public account?: AccountEntity;

  @Exclude()
  public servicosComoDentista?: Servico[];
  @Exclude()
  public servicosComoPaciente?: Servico[];

  static fromPrisma(
    contato?: Contato & {
      account?: Account;
      servicosComoDentista?: Servico[];
      servicosComoPaciente?: Servico[];
    },
  ): ContatoEntity | undefined {
    if (!contato) return;
    return new ContatoEntity({
      ...contato,
      account: AccountEntity.fromPrisma(contato.account),
    });
  }
}
