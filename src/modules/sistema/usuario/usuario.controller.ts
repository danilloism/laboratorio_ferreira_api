import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role } from './enums/role.enum';
import { RoleInterceptor } from './interceptors/role.interceptor';
import { UsuarioService } from './usuario.service';

@ApiTags('Usuários')
@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  @UseInterceptors(new RoleInterceptor([Role.ADMIN]))
  async findAll() {
    return await this.usuarioService.findAll();
  }
}
