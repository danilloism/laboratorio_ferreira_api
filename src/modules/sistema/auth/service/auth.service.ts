import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../../usuario/usuario.service';
import { Role } from '../../../../shared/enums/role.enum';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async criarToken() {
    const usuario: JwtPayload = {
      email: 'danilloilggner@gmail.com',
      username: 'danilloism',
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
