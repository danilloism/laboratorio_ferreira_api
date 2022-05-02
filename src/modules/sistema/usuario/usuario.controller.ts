import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Usuario } from '@prisma/client';
import { CreateContatoDto } from 'src/modules/agenda/contato/dto/create-contato.dto';
import { ContatoService } from 'src/modules/agenda/contato/service/contato.service';
import { ResultDto } from 'src/shared/dtos/result.dto';
import { HttpExceptionHelper } from 'src/shared/helpers/http-exception.helper';
import { Categoria } from '../shared/enum/categoria.enum';
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
  async find(
    @Query('id') id?: string,
    @Query('email') email?: string,
    @Query('username') username?: string,
  ) {
    if (id || email || username) {
      if ((id && (email || username)) || (email && username)) {
        HttpExceptionHelper.throwBadRequestException(
          'Requisição deve conter apenas um identificador.',
        );
      }

      const usuario = id
        ? await this.usuarioService.findById(id)
        : email
        ? await this.usuarioService.findByEmail(email)
        : await this.usuarioService.findByUsername(username);

      return usuario && usuario.ativo
        ? usuario
        : HttpExceptionHelper.throwNotFoundException(
            undefined,
            'Usuário não encontrado.',
          );
    }

    return await this.usuarioService.findAll();
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.usuarioService.delete(id).catch(err => {
      HttpExceptionHelper.throwHttpExceptionFromHttpException(
        err,
        'Erro ao deletar usuário.',
      );
    });

    return new ResultDto({
      sucesso: true,
      mensagem:
        'Usuário deletado com sucesso. Caso deseje recuperá-lo, consulte a documentação para saber como.',
    });
  }

  @Put('lixeira/:id')
  async recover(@Param('id') id: string) {
    const usuario = await this.usuarioService.recover(id).catch(err => {
      HttpExceptionHelper.throwHttpExceptionFromHttpException(
        err,
        'Erro ao recuperar usuário.',
      );
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
    return await this.usuarioService
      .update(id, updateUsuarioDto)
      .catch(err =>
        HttpExceptionHelper.throwHttpExceptionFromHttpException(err),
      );
  }

  @Post()
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return await this.usuarioService
      .create(createUsuarioDto)
      .catch(err =>
        HttpExceptionHelper.throwHttpExceptionFromHttpException(err),
      );
  }
}
