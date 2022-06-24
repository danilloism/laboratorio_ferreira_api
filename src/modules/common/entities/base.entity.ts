export interface BaseEntityParams {
  uid?: string;
  criadoEm?: Date;
  atualizadoEm?: Date;
  ativo?: boolean;
}

export abstract class BaseEntity {
  public uid?: string;
  public criadoEm?: Date;
  public atualizadoEm?: Date;
  public ativo?: boolean;

  constructor(params?: BaseEntityParams) {
    Object.assign(this, params);
  }
}
