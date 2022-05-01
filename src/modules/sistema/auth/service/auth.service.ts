import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../../usuario/usuario.service';
import { JwtPayload } from '../payload/jwt-payload.interface';
import { UsuarioWithRoles } from '../../usuario/type/usuario-with-roles.type';
import { Categoria } from '../../shared/enum/categoria.enum';
import { PasswordHelper } from 'src/shared/helpers/password.helper';

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
  ): Promise<UsuarioWithRoles> {
    const usuario =
      (await this.usuarioService.findByEmail(emailOrUsername)) ||
      (await this.usuarioService.findByUsername(emailOrUsername));

    if (usuario) {
      const senhaValida = await new PasswordHelper(senha).compare(
        usuario.senha,
      );

      const roles = await this.usuarioService.getRoles(usuario.contatoId);

      if (senhaValida) {
        return { ...usuario, roles: roles as Categoria[], senha: null };
      }
    }
  }

  async validateUsuario(payload: JwtPayload) {
    return payload;
  }
}
