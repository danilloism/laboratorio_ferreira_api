import { Categoria } from '../../shared/enum/categoria.enum';

export interface JwtPayload {
  sub: string;
  username?: string;
  email: string;
  roles: Categoria[];
}
