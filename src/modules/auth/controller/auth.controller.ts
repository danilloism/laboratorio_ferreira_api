import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
  Patch,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ContatoService } from 'src/modules/agenda/services/contato.service';
import { ResultDto } from '../../common/dtos/result.dto';
import { IsPublic } from '../decorators/is-public.decorator';
import { LoginDto } from '../dto/login.dto';
import { JwtPayload } from '../payload/jwt-payload.interface';
import { AuthService } from '../service/auth.service';

@ApiTags('Auth')
@Controller('user')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly contatoService: ContatoService,
  ) {}

  @IsPublic()
  @UseInterceptors(ClassSerializerInterceptor)
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

    const account = await this.authService.authenticate(login).catch(err => {
      const result = new ResultDto({
        sucesso: false,
        mensagem: 'Erro ao realizar login.',
        erro: err.message,
      });

      throw new HttpException(
        result,
        err instanceof HttpException ? err.getStatus() : HttpStatus.BAD_REQUEST,
      );
    });

    if (!account) {
      const result = new ResultDto({
        sucesso: false,
        mensagem: 'Erro ao realizar login.',
        erro: 'Usuário ou senha inválidos.',
      });
      throw new NotFoundException(result);
    }

    const dados: JwtPayload = {
      sub: account.info.contatoUid,
      username: account.info.username,
      email: account.info.email,
      roles: account.roles,
    };

    const token = this.authService.createToken(dados);

    return new ResultDto({
      sucesso: true,
      mensagem: 'Token gerado com sucesso.',
      dados: { access_token: token, roles: dados.roles },
    });
  }

  @Patch('refresh')
  async refreshToken(@Req() request: Request & { user: JwtPayload }) {
    const payload = request.user;

    const newToken = this.authService.createToken({
      email: payload.email,
      username: payload.username,
      roles: payload.roles,
      sub: payload.sub,
    });

    return new ResultDto({
      sucesso: true,
      mensagem: 'Token atualizado com sucesso.',
      dados: { access_token: newToken, roles: payload.roles },
    });
  }

  @Get('me')
  async userProfile(@Req() request: Request & { user: JwtPayload }) {
    const payload = request.user;

    return this.contatoService.findContatoByUid(payload.sub);
  }
}
