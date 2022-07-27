import { Injectable } from '@nestjs/common';
import { RoleEnum } from '@prisma/client';
import { RoleInterceptor } from './role.interceptor';

@Injectable()
export class GerenteRoleInterceptor extends RoleInterceptor {
  constructor() {
    super(RoleEnum.GERENTE);
  }
}
