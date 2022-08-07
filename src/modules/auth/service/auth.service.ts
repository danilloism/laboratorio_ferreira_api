import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Account, RoleEnum } from '@prisma/client';
import { ContatoService } from '../../agenda/services/contato.service';
import { PasswordHelper } from '../../common/helpers/password.helper';
import { LoginDto } from '../dto/login.dto';
import { JwtPayload } from '../payload/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly contatoService: ContatoService,
    private readonly jwtService: JwtService,
  ) {}

  createToken(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  decodeToken(token: string) {
    return this.jwtService.decode(token);
  }

  async authenticate(
    login: LoginDto,
  ): Promise<{ info: Account; roles: RoleEnum[] }> {
    let account: Account;
    if (login.username) {
      account = await this.contatoService.findAccountByUsername(login.username);
    } else if (login.email) {
      account = await this.contatoService.findAccountByEmail(login.email);
    }

    if (account) {
      const senhaValida = await new PasswordHelper(login.senha).compare(
        account.senha,
      );

      const roles = await this.contatoService.getRoles(account.contatoUid);

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
