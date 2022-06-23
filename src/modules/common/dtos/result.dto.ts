export class ResultDto {
  constructor(info: {
    sucesso: boolean;
    mensagem?: string;
    dados?: any;
    erro?: any;
  }) {
    this.sucesso = info.sucesso;
    this.mensagem = info.mensagem;
    this.dados = info.dados;
    this.erro = info.erro;
  }

  readonly sucesso: boolean;
  readonly mensagem?: string;
  readonly dados?: any;
  readonly erro?: any;
}
