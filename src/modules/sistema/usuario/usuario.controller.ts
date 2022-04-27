import {
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard, AuthService } from '../auth';
import { Role } from './enums/role.enum';
import { RoleInterceptor } from './interceptors/role.interceptor';
import { UsuarioService } from './usuario.service';

@ApiTags('Usuários')
@Controller('usuarios')
export class UsuarioController {
  constructor(
    private readonly authService: AuthService,
    private readonly usuarioService: UsuarioService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new RoleInterceptor([Role.ADMIN]))
  async findAll() {
    return await this.usuarioService.findAll();
  }
}
