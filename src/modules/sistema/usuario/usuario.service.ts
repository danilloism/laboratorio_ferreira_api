import { Injectable } from '@nestjs/common';
import { Categoria, Usuario } from '@prisma/client';
import { PasswordHelper } from 'src/shared/helpers/password.helper';
import { HttpExceptionHelper } from '../../../shared/helpers/http-exception.helper';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(private readonly prisma: PrismaService) {}

  async findByUsername(username: string): Promise<Usuario> {
    return await this.prisma.usuario.findUnique({
      where: { username },
    });
  }

  async findByEmail(email: string): Promise<Usuario> {
    return await this.prisma.usuario.findUnique({
      where: { email },
    });
  }

  async findById(id: string): Promise<Usuario> {
    return await this.prisma.usuario.findUnique({ where: { contatoId: id } });
  }

  async update(id: string, data: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { contatoId: id },
    });

    return usuario && usuario.ativo
      ? await this.prisma.usuario.update({
          where: { contatoId: id },
          data: data,
        })
      : HttpExceptionHelper.throwNotFoundException(
          undefined,
          'Usuário não existe ou foi deletado.',
        );
  }

  async delete(id: string): Promise<void> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { contatoId: id },
    });

    if (!usuario) {
      HttpExceptionHelper.throwNotFoundException(
        'Erro ao deletar usuário.',
        'Usuário não encontrado.',
      );
    } else if (!usuario.ativo) {
      HttpExceptionHelper.throwNotFoundException(
        'Erro ao deletar usuário.',
        'Usuário já foi deletado.',
      );
    }

    await this.prisma.usuario.update({
      where: { contatoId: id },
      data: { ativo: false },
    });
  }

  async recover(id: string): Promise<Usuario> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { contatoId: id },
    });

    if (!usuario || usuario.ativo) {
      HttpExceptionHelper.throwNotFoundException(
        'Erro ao recuperar usuário.',
        'Usuário não existe ou não está na lixeira.',
      );
    }

    return await this.prisma.usuario.update({
      where: { contatoId: id },
      data: { ativo: true },
    });
  }

  async getRoles(id: string): Promise<Categoria[]> {
    const contato = await this.prisma.contato.findUnique({ where: { id } });

    return contato
      ? contato.categorias
      : HttpExceptionHelper.throwNotFoundException();
  }

  async findAll(): Promise<Usuario[]> {
    return await this.prisma.usuario.findMany({ where: { ativo: true } });
  }

  async create(data: CreateUsuarioDto): Promise<Usuario> {
    const contato = await this.prisma.contato.findUnique({
      where: { id: data.contatoId },
    });

    const existeEmail = await this.findByEmail(data.email);
    const existeUsername = data.username
      ? await this.findByUsername(data.username)
      : false;
    const existeUsuario = await this.findById(data.contatoId);

    if (!contato) {
      HttpExceptionHelper.throwNotFoundException(
        'Erro ao criar usuário.',
        'Contato informado não encontrado.',
      );
    } else if (existeUsuario) {
      HttpExceptionHelper.throwBadRequestException(
        'Erro ao criar usuário.',
        'Contato informado já possui usuário cadastrado. Verifique se ele não foi deletado.',
      );
    } else if (existeEmail) {
      HttpExceptionHelper.throwBadRequestException(
        'Erro ao criar usuário.',
        'Email informado já está em uso.',
      );
    } else if (existeUsername) {
      HttpExceptionHelper.throwBadRequestException(
        'Erro ao criar usuário.',
        'Username informado já está em uso.',
      );
    }

    const senha = await new PasswordHelper(data.senha).encrypt();
    data = { ...data, senha };

    return await this.prisma.usuario.create({ data }).catch(err => {
      throw err;
    });
  }

  async getDeleted() {
    return await this.prisma.usuario.findMany({
      where: { ativo: false },
    });
  }
}
