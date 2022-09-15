import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import ContatoEntity from '../../agenda/entities/contato.entity';
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

  async authenticate(login: LoginDto): Promise<ContatoEntity> {
    const contato = await this.contatoService.findContatoByEmail(login.email);

    if (contato) {
      const senhaValida = await PasswordHelper.compare(
        login.senha,
        contato.account.senha,
      );

      if (senhaValida) {
        return contato;
      }
    }
  }

  async validateUsuario(payload: JwtPayload) {
    return payload;
  }

  async getUserFromJwt(jwt: string) {
    const payload: JwtPayload = this.jwtService.verify(jwt);
    return await this.contatoService.findAccountByContatoUid(payload.sub);
  }
}
