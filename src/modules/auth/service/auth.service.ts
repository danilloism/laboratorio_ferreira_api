import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RoleEnum, Usuario } from '@prisma/client';
import { ContatoService } from '../../agenda/contato/services/contato.service';
import { PasswordHelper } from '../../common/helpers/password.helper';
import { JwtPayload } from '../payload/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly contatoService: ContatoService,
    private readonly jwtService: JwtService,
  ) {
  }

  createToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  decodeToken(token: string) {
    return this.jwtService.decode(token);
  }

  async authenticate(
    emailOrUsername: string,
    senha: string,
  ): Promise<{ info: Usuario; roles: RoleEnum[] }> {
    const account =
            (await this.contatoService.findAccountByEmail(emailOrUsername)) ||
            (await this.contatoService.findAccountByUsername(emailOrUsername));

    if (account) {
      const senhaValida = await new PasswordHelper(senha).compare(
        account.senha,
      );

      const roles = await this.contatoService.getRoles(account.contato.uid);

      if (senhaValida) {
        return {
          info: account,
          roles,
        };
      }
    }
  }

  async validateUsuario(payload: JwtPayload) {
    return payload;
  }
}
