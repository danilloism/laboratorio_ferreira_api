import { Injectable } from '@nestjs/common';
import { CategoriaEnum } from '../../agenda/contato/enums/categoria.enum';
import { RoleInterceptor } from './role.interceptor';

@Injectable()
export class DentistaEspOdontRoleInterceptor extends RoleInterceptor {
  constructor() {
    super(CategoriaEnum.DENTISTA, CategoriaEnum.COLABORADOR);
  }
}
