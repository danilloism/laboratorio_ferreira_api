import { OmitType } from '@nestjs/swagger';

export class ResultDto<T = any> {
  constructor(info: {
    sucesso: boolean;
    mensagem?: string;
    dados?: T;
    erro?: any;
  }) {
    this.sucesso = info.sucesso;
    this.mensagem = info.mensagem;
    this.dados = info.dados;
    this.erro = info.erro;
  }

  readonly sucesso: boolean;
  readonly mensagem?: string;
  readonly dados?: T;
  readonly erro?: any;
}

export class NotFoundResultDto extends OmitType(ResultDto, ['dados']) {}
