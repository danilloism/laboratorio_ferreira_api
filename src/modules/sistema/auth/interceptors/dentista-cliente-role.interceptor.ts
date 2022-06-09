import { Injectable } from '@nestjs/common';
import { RoleInterceptor } from './role.interceptor';

@Injectable()
export class DentistaClienteRoleInterceptor extends RoleInterceptor {
  constructor() {
    super('dentista', 'cliente');
  }
}
