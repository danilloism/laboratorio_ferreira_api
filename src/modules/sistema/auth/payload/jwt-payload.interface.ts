import { CategoriaEnum } from 'src/modules/agenda/contato/enums/categoria.enum';

export interface JwtPayload {
  sub: string;
  username?: string;
  email: string;
  roles: CategoriaEnum[];
  // iat?: string; //TODO
  // exp?: string;
}
