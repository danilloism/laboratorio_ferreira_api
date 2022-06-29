import { Injectable } from '@nestjs/common';
import { Role } from '../../agenda/contato/enums/role.enum';
import { RoleInterceptor } from './role.interceptor';

@Injectable()
export class GerenteRoleInterceptor extends RoleInterceptor {
  constructor() {
    super(Role.GERENTE);
  }
}
