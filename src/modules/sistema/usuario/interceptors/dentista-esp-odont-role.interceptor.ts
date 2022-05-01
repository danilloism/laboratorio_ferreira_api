import { Injectable } from '@nestjs/common';
import { Categoria } from 'src/shared/enums/categoria.enum';
import { RoleInterceptor } from './role.interceptor';

@Injectable()
export class DentistaEspOdontRoleInterceptor extends RoleInterceptor {
  constructor() {
    super(Categoria.DENTISTA, Categoria.COLABORADOR);
  }
}
