import { Injectable } from '@nestjs/common';
import { Categoria } from 'src/modules/sistema/shared/enum/categoria.enum';
import { RoleInterceptor } from './role.interceptor';

@Injectable()
export class DentistaClienteRoleInterceptor extends RoleInterceptor {
  constructor() {
    super(Categoria.DENTISTA, Categoria.CLIENTE);
  }
}
