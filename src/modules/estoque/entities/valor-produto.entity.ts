export class ValorProdutoEntity {
  constructor(params: Partial<ValorProdutoEntity>) {
    Object.assign(this, params);
  }

  public uid: string;
  public criadoEm: Date;
  public atualizadoEm: Date;
  public ativo: boolean;
  public espOdont: boolean;
  public valorEmCents: number;
  public dtFim: Date | null;
  public produtoUid: string;
}
