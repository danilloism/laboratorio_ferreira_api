import { Injectable } from '@nestjs/common';
import { Categoria } from '../../shared/enum/categoria.enum';
import { RoleInterceptor } from './role.interceptor';

@Injectable()
export class DentistaClienteRoleInterceptor extends RoleInterceptor {
  constructor() {
    super(Categoria.DENTISTA, Categoria.CLIENTE);
  }
}
