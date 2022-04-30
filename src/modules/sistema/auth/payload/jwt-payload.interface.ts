import { Role } from '../../usuario/enums/role.enum';

export interface JwtPayload {
  sub: string;
  username?: string;
  email: string;
  role: Role;
}
