import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Usuario } from '@prisma/client';
import { CreateContatoDto } from 'src/modules/agenda/contato/dto/create-contato.dto';
import { HttpExceptionHelper } from 'src/shared/helpers/http-exception.helper';
import { Categoria } from '../shared/enum/categoria.enum';
import { RoleInterceptor } from '../shared/interceptor/role.interceptor';
import { UsuarioService } from './usuario.service';

@ApiTags('Usuários')
@Controller('usuarios')
@UseInterceptors(new RoleInterceptor(Categoria.ADMIN))
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
        : HttpExceptionHelper.throwNotFoundException('Usuário não encontrado.');
    }

    return await this.usuarioService.findAll();
  }

  @Delete()
  async delete(
    @Query('id') id?: string,
    @Query('email') email?: string,
    @Query('username') username?: string,
  ) {
    if (!id && !email && !username) {
      HttpExceptionHelper.throwBadRequestException(
        'Requisição deve conter identificador do usuário a ser deletado (id, email ou username)',
      );
    }

    if ((id && (email || username)) || (email && username)) {
      HttpExceptionHelper.throwBadRequestException(
        'Requisição deve conter apenas um identificador.',
      );
    }

    const usuario = (await this.find(id, email, username)) as Usuario;

    await this.usuarioService.delete({ id: usuario.contatoId }).catch(err => {
      HttpExceptionHelper.throwHttpExceptionFromHttpException(err);
    });
  }

  @Post()
  async createOrRecover(
    @Query('id') id?: string,
    @Query('email') email?: string,
    @Query('username') username?: string,
    @Body() createContatoDto?: CreateContatoDto,
  ) {
    if (!id && !email && !username && !createContatoDto) {
      HttpExceptionHelper.throwBadRequestException(
        'Requisição deve conter identificador do usuário a ser recuperado (id, email ou username) ou corpo de contato a ser criado. Para mais informações consulte a documentação.',
      );
    }

    if (createContatoDto && !(id || email || username)) {
    } //TODO

    if ((id && (email || username)) || (email && username)) {
      HttpExceptionHelper.throwBadRequestException(
        'Requisição deve conter apenas um identificador.',
      );
    }

    const usuario = (await this.find(id, email, username)) as Usuario;

    await this.usuarioService.recover({ id: usuario.contatoId }).catch(err => {
      HttpExceptionHelper.throwHttpExceptionFromHttpException(err);
    });
  }
}
