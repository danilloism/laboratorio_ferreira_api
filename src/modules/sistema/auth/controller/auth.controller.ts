import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ResultDto } from 'src/shared/dtos/result.dto';
import { Role } from '../../usuario/enums/role.enum';
import { LoginDto } from '../dto/login.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AuthService } from '../service/auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    const usuario = await this.authService.authenticate(
      loginDto.username || loginDto.email,
      loginDto.senha,
    );

    if (!usuario) {
      const result = new ResultDto({
        success: false,
        message: 'Usuário ou senha inválidos.',
      });
      throw new UnauthorizedException(result);
    }

    const token = await this.authService.createToken({
      username: usuario.username,
      email: usuario.email,
      roles: usuario.roles as Role[],
    });

    return new ResultDto({
      success: true,
      message: 'Token gerado com sucesso.',
      data: { ...loginDto, senha: undefined, access_token: token },
    });
  }
}
