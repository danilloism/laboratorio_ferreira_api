import { Usuario } from '@prisma/client';
import { Categoria } from 'src/shared/enums/categoria.enum';

export interface UsuarioWithRoles extends Usuario {
  roles: Categoria[];
}
