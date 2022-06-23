import { Injectable } from '@nestjs/common';
import { CategoriaEnum } from '../../agenda/contato/enums/categoria.enum';
import { RoleInterceptor } from './role.interceptor';

@Injectable()
export class GerenteRoleInterceptor extends RoleInterceptor {
  constructor() {
    super(CategoriaEnum.GERENTE);
  }
}
