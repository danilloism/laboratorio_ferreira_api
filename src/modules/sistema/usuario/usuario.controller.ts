import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Categoria } from '../../../shared/enums/categoria.enum';
import { RoleInterceptor } from './interceptors/role.interceptor';
import { UsuarioService } from './usuario.service';

@ApiTags('Usuários')
@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  @UseInterceptors(new RoleInterceptor([Categoria.ADMIN]))
  async findAll() {
    return await this.usuarioService.findAll();
  }
}
