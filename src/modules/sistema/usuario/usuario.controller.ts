import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Categoria } from '../../../shared/enums/categoria.enum';
import { RoleInterceptor } from './interceptors/role.interceptor';
import { UsuarioService } from './usuario.service';

@ApiTags('Usuários')
@Controller('usuarios')
@UseInterceptors(new RoleInterceptor(Categoria.ADMIN))
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  async findAll() {
    return await this.usuarioService.findAll();
  }
}
