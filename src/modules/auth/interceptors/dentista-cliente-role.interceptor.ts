import { Injectable } from '@nestjs/common';
import { Role } from '../enums/role.enum';
import { RoleInterceptor } from './role.interceptor';

@Injectable()
export class DentistaClienteRoleInterceptor extends RoleInterceptor {
  constructor() {
    super(Role.DENTISTA);
  }
}
