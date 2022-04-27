import { Role } from '../../usuario/enums/role.enum';

export interface JwtPayload {
  username?: string;
  email: string;
  roles: Role[];
}
