import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResultDto } from '../../../shared/dtos/result.dto';
import { HttpExceptionHelper } from '../../../shared/helpers/http-exception.helper';
import { RoleInterceptor } from '../shared/interceptor/role.interceptor';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuarioService } from './usuario.service';

@ApiTags('Usuários')
@Controller('usuarios')
@UseInterceptors(new RoleInterceptor())
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  async find() {
    return await this.usuarioService.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const usuario = await this.usuarioService.findById(id);

    return usuario && usuario.ativo
      ? usuario
      : HttpExceptionHelper.throwNotFoundException(
          undefined,
          'Usuário não encontrado.',
        );
  }

  @Get('by-email/:email')
  async getByEmail(@Param() email: string) {
    const usuario = await this.usuarioService.findById(email);

    return usuario && usuario.ativo
      ? usuario
      : HttpExceptionHelper.throwNotFoundException(
          undefined,
          'Usuário não encontrado.',
        );
  }

  @Get('by-username/:username')
  async getByUsername(@Param() username: string) {
    const usuario = await this.usuarioService.findById(username);

    return usuario && usuario.ativo
      ? usuario
      : HttpExceptionHelper.throwNotFoundException(
          undefined,
          'Usuário não encontrado.',
        );
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.usuarioService.delete(id).catch(err => {
      if (err instanceof HttpException) {
        throw err;
      }

      //TODO: fazer um result dto aqui
    });

    return new ResultDto({
      sucesso: true,
      mensagem:
        'Usuário deletado com sucesso. Caso deseje recuperá-lo, consulte a documentação para saber como.',
    });
  }

  @Patch('lixeira/:id')
  async recover(@Param('id') id: string) {
    const usuario = await this.usuarioService.recover(id).catch(err => {
      if (err instanceof HttpException) {
        throw err;
      }

      //TODO: fazer um result dto aqui
    });

    return new ResultDto({
      sucesso: true,
      mensagem: 'Usuário recuperado com sucesso.',
      dados: usuario,
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    return await this.usuarioService.update(id, updateUsuarioDto).catch(err => {
      if (err instanceof HttpException) {
        throw err;
      }

      //TODO: fazer um result dto aqui
    });
  }

  @Post()
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return await this.usuarioService.create(createUsuarioDto).catch(err => {
      if (err instanceof HttpException) {
        throw err;
      }

      //TODO: fazer um result dto aqui
    });
  }

  @Get('lixeira')
  async getDeleted() {
    return await this.usuarioService.getTrash();
  }
}
