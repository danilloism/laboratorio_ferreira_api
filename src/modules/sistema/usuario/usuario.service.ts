import { Injectable } from '@nestjs/common';
import { Usuario } from '@prisma/client';
import { HttpExceptionHelper } from 'src/shared/helpers/http-exception.helper';
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

  async update(id: string, data: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.prisma.contato.findUnique({ where: { id } });

    return usuario
      ? await this.prisma.usuario.update({
          where: { contatoId: id },
          data: data,
        })
      : HttpExceptionHelper.throwNotFoundException();
  }

  async delete(id: string) {
    const usuario = await this.prisma.contato.findUnique({ where: { id } });

    if (!usuario) {
      HttpExceptionHelper.throwNotFoundException();
    }

    await this.prisma.usuario.update({
      where: { contatoId: id },
      data: { ativo: false },
    });
  }

  async getRoles(id: string) {
    const contato = await this.prisma.contato.findUnique({ where: { id } });
    if (!contato) {
      HttpExceptionHelper.throwNotFoundException();
    }
    return contato.categorias;
  }

  async findAll(): Promise<Usuario[]> {
    return await this.prisma.usuario.findMany();
  }
}
