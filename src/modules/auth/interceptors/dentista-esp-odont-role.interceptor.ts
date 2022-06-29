import { Injectable } from '@nestjs/common';
import { Role } from '../../agenda/contato/enums/role.enum';
import { RoleInterceptor } from './role.interceptor';

@Injectable()
export class DentistaEspOdontRoleInterceptor extends RoleInterceptor {
  constructor() {
    super(Role.DENTISTA, Role.COLABORADOR);
  }
}
