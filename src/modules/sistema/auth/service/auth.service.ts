import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../../usuario/usuario.service';
import { JwtPayload } from '../payload/jwt-payload.interface';
import * as bcrypt from 'bcrypt';
import { UsuarioWithRole } from '../../usuario/type/usuario-with-role.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async createToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  async authenticate(
    emailOrUsername: string,
    senha: string,
  ): Promise<UsuarioWithRole> {
    const usuario =
      (await this.usuarioService.findByEmail(emailOrUsername)) ||
      (await this.usuarioService.findByUsername(emailOrUsername));

    if (usuario) {
      const senhaValida = await bcrypt.compare(senha, usuario.senha);

      const role = await this.usuarioService.getRole(usuario.contatoId);

      if (senhaValida) {
        return { ...usuario, role, senha: null };
      }
    }
  }

  async validateUsuario(payload: JwtPayload) {
    return payload;
  }
}
