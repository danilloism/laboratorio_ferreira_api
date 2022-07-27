import { Injectable } from '@nestjs/common';
import { RoleEnum } from '@prisma/client';
import { RoleInterceptor } from './role.interceptor';

@Injectable()
export class DentistaEspOdontRoleInterceptor extends RoleInterceptor {
  constructor() {
    super(RoleEnum.DENTISTA, RoleEnum.COLABORADOR);
  }
}
