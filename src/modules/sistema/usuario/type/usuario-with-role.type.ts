import { Usuario } from '@prisma/client';

export interface UsuarioWithRole extends Usuario {
  role: string;
}
