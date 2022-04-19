import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountService } from '../../account/account.service';
import { Role } from '../../../../shared/enums/role.enum';
import { JwtPayload } from '../jwt/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
  ) {}

  async criarToken() {
    const usuario: JwtPayload = {
      email: 'danilloilggner@gmail.com',
      roles: [Role.COLABORADOR, Role.USUARIO],
    };
    const acessarToken = this.jwtService.sign(usuario);
    return {
      expiresIn: 3600,
      acessarToken,
    };
  }

  async validarUsuario(payload: JwtPayload) {
    // return (
    //   (await this.accountService.findByUsername(payload.username)) ||
    //   (await this.accountService.findByEmail(payload.email))
    // );
    return payload;
  }
}
