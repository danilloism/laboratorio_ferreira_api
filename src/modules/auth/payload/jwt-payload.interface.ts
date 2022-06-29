import { RoleEnum } from '@prisma/client';

export interface JwtPayload {
  sub: string;
  contatoUid: string;
  username?: string;
  email: string;
  roles: RoleEnum[];
}
