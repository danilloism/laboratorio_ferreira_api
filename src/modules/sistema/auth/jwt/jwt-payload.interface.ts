import { Role } from '../../../../shared/enums/role.enum';

export interface JwtPayload {
  username?: string;
  email: string;
  image?: string;
  roles: Role[];
}
