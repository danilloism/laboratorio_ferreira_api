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
          'Usuário não existe ou foi deletado.',
        );
  }

  async delete({
    id,
    email,
    username,
  }: {
    id?: string;
    email?: string;
    username?: string;
  }): Promise<void> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { contatoId: id, email, username },
    });

    if (!usuario || !usuario.ativo) {
      HttpExceptionHelper.throwNotFoundException();
    }

    await this.prisma.usuario.update({
      where: { contatoId: id, email, username },
      data: { ativo: false },
    });
  }

  async recover({
    id,
    email,
    username,
  }: {
    id?: string;
    email?: string;
    username?: string;
  }): Promise<void> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { contatoId: id, email, username },
    });

    if (!usuario || usuario.ativo) {
      HttpExceptionHelper.throwNotFoundException(
        'Usuário não existe ou não está na lixeira.',
      );
    }

    await this.prisma.usuario.update({
      where: { contatoId: id, email, username },
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
    return await this.prisma.usuario.findMany();
  }
}
