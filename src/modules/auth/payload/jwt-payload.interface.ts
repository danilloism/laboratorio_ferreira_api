import { RoleEnum } from '@prisma/client';

export interface JwtPayload {
  sub: string;
  email: string;
  roles: RoleEnum[];
  iat?: number;
  exp?: number;
}
