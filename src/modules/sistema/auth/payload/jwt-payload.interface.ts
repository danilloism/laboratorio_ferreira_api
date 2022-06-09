import { Categoria } from '@prisma/client';

export interface JwtPayload {
  sub: string;
  username?: string;
  email: string;
  roles: Categoria[];
}
