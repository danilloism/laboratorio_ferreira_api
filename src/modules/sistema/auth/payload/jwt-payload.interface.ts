import { Categoria } from '../../../../shared/enums/categoria.enum';

export interface JwtPayload {
  sub: string;
  username?: string;
  email: string;
  roles: Categoria[];
}
