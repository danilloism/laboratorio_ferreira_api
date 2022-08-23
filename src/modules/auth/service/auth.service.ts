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

  async authenticate(login: LoginDto): Promise<Account & { contato: Contato }> {
    const account = await this.contatoService.findAccountByEmail(login.email);

    if (account) {
      const senhaValida = await new PasswordHelper(login.senha).compare(
        account.senha,
      );

      if (senhaValida) return account;
    }
  }

  async validateUsuario(payload: JwtPayload) {
    return payload;
  }
}
