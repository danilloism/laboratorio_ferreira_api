import { Exclude, Expose } from 'class-transformer';
import { CategoriaEntity } from 'src/modules/agenda/contato/entities/categoria.entity';
import { BaseEntity, BaseEntityParams } from '../../../common/entities/base.entity';
import { ContaUsuarioEntity } from 'src/modules/agenda/contato/entities/conta-usuario.entity';
import { Servico } from '../../../servico/entities/servico.entity';
import { LancamentoFinanceiro } from '../../../financeiro/entities/lancamento-financeiro.entity';

export interface ContatoParams extends BaseEntityParams {
  nome?: string;
  telefone?: string;
  categorias?: CategoriaEntity[];
  contaUsuario?: ContaUsuarioEntity;
  servicosComoDentista?: Servico[];
  servicosComoPaciente?: Servico[];
  lancamentosRecebidos?: LancamentoFinanceiro[];
}

export class ContatoEntity extends BaseEntity {
  public nome?: string;
  public telefone?: string;
  @Exclude()
  public categorias?: CategoriaEntity[];
  public contaUsuario?: ContaUsuarioEntity;
  @Exclude()
  public servicosComoDentista?: Servico[];
  @Exclude()
  public servicosComoPaciente?: Servico[];
  @Exclude()
  public lancamentosRecebidos?: LancamentoFinanceiro[];

  constructor(params?: ContatoParams) {
    const { uid, criadoEm, atualizadoEm, ativo, ...thisParams } = params;
    super({ uid, criadoEm, atualizadoEm, ativo });
    Object.assign(this, thisParams);
  }

  @Expose({ name: 'categorias' })
  get nomeCategorias() {
    return this.categorias?.map(categoria => categoria.nome);
  }

  @Exclude()
  get isDentistaEspOdont() {
    return '';
  }

  @Exclude()
  get isDentistaCliente() {
    return '';
  }

}
