import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { ResultDto } from '../../../../shared/dtos/result.dto';
import { Categoria } from '../../../../shared/enums/categoria.enum';
import { IsPublic } from '../decorators/is-public.decorator';
import { LoginDto } from '../dto/login.dto';
import { AuthService } from '../service/auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() login: LoginDto) {
    const usuario = await this.authService
      .authenticate(login.username || login.email, login.senha)
      .catch(err => {
        const result = new ResultDto({
          sucesso: false,
          mensagem: 'Erro ao autenticar usuário.',
          erro: err,
        });

        throw new NotFoundException(result);
      });

    if (!usuario) {
      const result = new ResultDto({
        sucesso: false,
        mensagem: 'Usuário ou senha inválidos.',
      });
      throw new NotFoundException(result);
    }

    const token = await this.authService.createToken({
      sub: usuario.contatoId,
      username: usuario.username,
      email: usuario.email,
      roles: usuario.roles,
    });

    return new ResultDto({
      sucesso: true,
      mensagem: 'Token gerado com sucesso.',
      dados: { access_token: token, ...login, senha: null },
    });
  }
}
