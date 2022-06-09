import { Injectable } from '@nestjs/common';
import { RoleInterceptor } from './role.interceptor';

@Injectable()
export class DentistaEspOdontRoleInterceptor extends RoleInterceptor {
  constructor() {
    super('dentista', 'colaborador');
  }
}
