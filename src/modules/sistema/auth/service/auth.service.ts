import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../../usuario/usuario.service';
import { Role } from '../../usuario/enums/role.enum';
import { JwtPayload } from '../payload/jwt-payload.interface';
import * as bcrypt from 'bcrypt';
import { Usuario } from '../../prisma';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async createToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  async authenticate(emailOrUsername: string, senha: string): Promise<Usuario> {
    const usuario =
      (await this.usuarioService.findByEmail(emailOrUsername)) ||
      (await this.usuarioService.findByUsername(emailOrUsername));

    if (usuario) {
      const senhaValida = await bcrypt.compare(senha, usuario.senha);
      if (senhaValida) {
        return { ...usuario, senha: undefined };
      }
    }

    let emptyUsuario: Usuario;
    return emptyUsuario;
  }

  async validateUsuario(payload: JwtPayload) {
    return payload;
  }
}
