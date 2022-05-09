import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Prisma, Usuario } from '@prisma/client';
import { UpdateContatoDto } from '../dto/update-contato.dto';
import { CreateContatoDto } from '../dto/create-contato.dto';
import { PasswordHelper } from '../../../../shared/helpers/password.helper';
import type { PrismaException } from '../../../../shared/types/prisma-exception.type';
import { PrismaService } from '../../../sistema/prisma/prisma.service';
import { HttpExceptionHelper } from 'src/shared/helpers/http-exception.helper';

@Injectable()
export class ContatoService {
  constructor(private readonly prismaService: PrismaService) {}
  async findById(id: string) {
    return await this.prismaService.contato.findUnique({
      where: { id },
      include: {
        usuario: {
          select: { username: true, email: true },
        },
      },
    });
  }

  async findByTelefone(telefone: string) {
    return await this.prismaService.contato.findUnique({
      where: { telefone },
      include: {
        usuario: { select: { username: true, email: true } },
      },
    });
  }

  async find(
    where?: Prisma.ContatoWhereInput,
    include: Prisma.ContatoInclude = {
      usuario: {
        select: { username: true, email: true },
      },
    },
  ) {
    return await this.prismaService.contato.findMany({
      where: where,
      include: include,
    });
  }

  async create({ nome, telefone, usuario, categorias }: CreateContatoDto) {
    if (usuario) {
      const { email, username } = usuario;

      const invalidaEmail = await this.prismaService.usuario.findUnique({
        where: { email },
      });
      if (invalidaEmail) {
        HttpExceptionHelper.throwConflictException(
          'Erro ao criar contato.',
          'Email informado já está em uso.',
        );
      }

      const invalidaUsername = await this.prismaService.usuario.findUnique({
        where: { username },
      });
      if (invalidaUsername) {
        HttpExceptionHelper.throwConflictException(
          'Erro ao criar contato.',
          'Username informado já está em uso.',
        );
      }

      const senha = await new PasswordHelper(usuario.senha).encrypt();
      Object.assign(usuario, { ...usuario, senha: senha });
    }

    const invalidaTelefone = await this.findByTelefone(telefone);
    if (invalidaTelefone) {
      HttpExceptionHelper.throwConflictException(
        'Erro ao criar contato.',
        'Telefone já consta no sistema.',
      );
    }

    return await this.prismaService.contato
      .create({
        data: {
          nome,
          telefone,
          categorias,
          usuario: { create: usuario },
        },
        include: {
          usuario: usuario
            ? {
                select: {
                  email: true,
                  username: true,
                },
              }
            : false,
        },
      })
      .catch(() => {
        HttpExceptionHelper.throwInternalServerException(
          'Erro ao criar contato',
          'Erro desconhecido.',
        );
      });
  }

  async update(id: string, atualizarContatoDto: UpdateContatoDto) {
    const valida = this.findById(id);
    if (!valida) {
      HttpExceptionHelper.throwNotFoundException(
        'Erro ao atualizar contato.',
        'Contato não encontrado.',
      );
    }

    return await this.prismaService.contato
      .update({
        where: { id },
        data: atualizarContatoDto,
      })
      .catch(() => {
        HttpExceptionHelper.throwInternalServerException(
          'Erro ao atualizar contato.',
        );
      });
  }

  async getUsuario(id: string): Promise<Usuario> {
    return await this.prismaService.usuario.findUnique({
      where: { contatoId: id },
    });
  }
}
