import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../payload/jwt-payload.interface';
import { PasswordHelper } from '../../../../shared/helpers/password.helper';
import { ContatoService } from '../../../agenda/contato/service/contato.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly contatoService: ContatoService,
    private readonly jwtService: JwtService,
  ) {}

  async createToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  async authenticate(emailOrUsername: string, senha: string) {
    const usuario =
      (await this.contatoService.getAccountByEmail(emailOrUsername)) ||
      (await this.contatoService.getAccountByUsername(emailOrUsername));

    if (usuario) {
      const senhaValida = await new PasswordHelper(senha).compare(
        usuario.senha,
      );

      const roles = await this.contatoService.getRoles(usuario.contatoId);

      if (senhaValida) {
        return { ...usuario, roles: roles, senha: null };
      }
    }
  }

  async validateUsuario(payload: JwtPayload) {
    return payload;
  }
}
