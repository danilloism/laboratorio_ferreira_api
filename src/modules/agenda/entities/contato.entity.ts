import { Account, Contato, Servico } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { Role } from '../../auth/enums/role.enum';
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
  public categorias: Role[];

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
    const roles = contato.categorias.map(role => Role[role]);
    return new ContatoEntity({
      ...contato,
      categorias: roles,
      account: AccountEntity.fromPrisma(contato.account),
    });
  }
}
