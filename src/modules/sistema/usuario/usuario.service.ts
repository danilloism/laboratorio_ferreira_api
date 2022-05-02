import { Injectable } from '@nestjs/common';
import { Categoria, Usuario } from '@prisma/client';
import { HttpExceptionHelper } from '../../../shared/helpers/http-exception.helper';
import { PrismaService } from '../prisma/prisma.service';
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
}
