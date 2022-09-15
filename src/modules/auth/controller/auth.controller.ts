import {
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
import { ContatoService } from 'src/modules/agenda/services/contato.service';
import { ResultDto } from '../../common/dtos/result.dto';
import { RequestWithUser } from '../../common/types/request-with-user.type';
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
    const contato = await this.authService.authenticate(login).catch(err => {
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

    if (!contato) {
      const result = new ResultDto({
        sucesso: false,
        mensagem: 'Erro ao realizar login.',
        erro: 'Usuário ou senha inválidos.',
      });
      throw new NotFoundException(result);
    }

    const dados: JwtPayload = {
      sub: contato.uid,
      email: contato.account.email,
      roles: contato.categorias,
    };

    const token = this.authService.createToken(dados);

    return new ResultDto({
      sucesso: true,
      mensagem: 'Token gerado com sucesso.',
      dados: { accessToken: token, contato },
    });
  }

  @Patch('refresh')
  async refreshToken(@Req() request: RequestWithUser) {
    const payload = request.user;

    const newToken = this.authService.createToken({
      email: payload.email,
      roles: payload.roles,
      sub: payload.sub,
    });

    return new ResultDto({
      sucesso: true,
      mensagem: 'Token atualizado com sucesso.',
      dados: { accessToken: newToken },
    });
  }

  @Get('me')
  async userProfile(@Req() request: RequestWithUser) {
    const payload = request.user;

    return this.contatoService.findContatoByUid(payload.sub);
  }
}
