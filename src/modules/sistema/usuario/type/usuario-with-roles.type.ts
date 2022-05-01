import { Usuario } from '@prisma/client';
import { Categoria } from '../../shared/enum/categoria.enum';

export interface UsuarioWithRoles extends Usuario {
  roles: Categoria[];
}
