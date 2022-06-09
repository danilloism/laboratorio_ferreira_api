import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../payload/jwt-payload.interface';
import { PasswordHelper } from '../../../common/helpers/password.helper';
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
    const account =
      (await this.contatoService.findAccountByEmail(emailOrUsername)) ||
      (await this.contatoService.findAccountByUsername(emailOrUsername));

    if (account) {
      const senhaValida = await new PasswordHelper(senha).compare(
        account.senha,
      );

      const roles = await this.contatoService.getRoles(account.contato.id);

      if (senhaValida) {
        return { ...account, roles: roles, senha: null };
      }
    }
  }

  async validateUsuario(payload: JwtPayload) {
    return payload;
  }
}
