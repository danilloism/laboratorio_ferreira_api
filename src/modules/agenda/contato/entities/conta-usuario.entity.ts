import { Exclude } from 'class-transformer';
import { BaseEntity, BaseEntityParams } from '../../../common/entities/base.entity';
import { ContatoEntity } from './contato.entity';

export interface ContaUsuarioParams extends BaseEntityParams {
  email?: string;
  username?: string;
  senha?: string;
  contatoUid?: string;
  contato?: ContatoEntity;
}

export class ContaUsuarioEntity extends BaseEntity {
  public email?: string;
  public username?: string;
  @Exclude()
  public senha?: string;
  @Exclude()
  public contatoUid?: string;
  @Exclude()
  public Contato?: ContatoEntity;

  constructor(params?: ContaUsuarioParams) {
    const { uid, criadoEm, atualizadoEm, ativo, ...thisParams } = params;
    super({ uid, criadoEm, atualizadoEm, ativo });

    this.contatoUid = thisParams?.contato?.uid;
    Object.assign(this, thisParams);
  }
}
