import { CategoriaEnum } from '../../../agenda/contato/enums/categoria.enum';

export interface JwtPayload {
  sub: string;
  username?: string;
  email: string;
  roles: CategoriaEnum[];
}
