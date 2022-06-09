import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResultDto } from '../../../../shared/dtos/result.dto';
import { IsPublic } from '../decorators/is-public.decorator';
import { LoginDto } from '../dto/login.dto';
import { JwtPayload } from '../payload/jwt-payload.interface';
import { AuthService } from '../service/auth.service';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() login: LoginDto) {
    if (!login.email && !login.username) {
      const result = new ResultDto({
        sucesso: false,
        mensagem: 'Erro ao realizar login.',
        erro: 'Deve ser informado pelo menos username ou email.',
      });
      throw new BadRequestException(result);
    }

    const usuario = await this.authService
      .authenticate(login.username || login.email, login.senha)
      .catch(err => {
        const result = new ResultDto({
          sucesso: false,
          mensagem: 'Erro ao autenticar usuário.',
          erro: err.message,
        });

        throw new NotFoundException(result);
      });

    if (!usuario) {
      const result = new ResultDto({
        sucesso: false,
        mensagem: 'Erro ao realizar login.',
        erro: 'Usuário ou senha inválidos.',
      });
      throw new NotFoundException(result);
    }

    const dados: JwtPayload = {
      sub: usuario.contatoId,
      username: usuario.username,
      email: usuario.email,
      roles: usuario.roles,
    };

    const token = await this.authService.createToken(dados);

    const { email, username } = dados;

    return new ResultDto({
      sucesso: true,
      mensagem: 'Token gerado com sucesso.',
      dados: {
        access_token: token,
        roles: dados.roles,
        id: dados.sub,
        login: { email, username },
      },
    });
  }

  @Post('refresh')
  async refreshToken(@Req() request) {
    const payload: JwtPayload = request.user;
    console.log(payload);
    const token = await this.authService.createToken({
      sub: payload.sub,
      email: payload.email,
      roles: payload.roles,
      username: payload.username,
    });

    return new ResultDto({
      sucesso: true,
      mensagem: 'Token atualizado com sucesso.',
      dados: {
        access_token: token,
        roles: payload.roles,
        id: payload.sub,
        login: { email: payload.email, username: payload.username },
      },
    });
  }
}
