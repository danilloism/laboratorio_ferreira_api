import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Account, Contato } from '@prisma/client';
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
    return this.jwtService.decode(token) as JwtPayload;
  }

  async authenticate(
    login: LoginDto,
  ): Promise<Contato & { account: Partial<Account> }> {
    const contato = await this.contatoService.findContatoByEmail(login.email, {
      mostrarSenha: true,
    });

    if (contato) {
      const senhaValida = await new PasswordHelper(login.senha).compare(
        contato.account.senha,
      );

      if (senhaValida) {
        const { senha, ...accountSemSenha } = contato.account;
        contato.account = accountSemSenha;

        return contato;
      }
    }
  }

  async validateUsuario(payload: JwtPayload) {
    return payload;
  }
}
