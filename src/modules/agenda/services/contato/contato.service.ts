import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CriarContatoDto } from '../../dtos/contato/criar-contato.dto';
import { PrismaService } from '../../../sistema/prisma';
import { Contato, Telefone, Usuario, Prisma } from '@prisma/client';
import { ResultDto } from '../../../../shared/dtos/result.dto';
import { ServiceHttpExceptionDto } from 'src/shared/dtos/service-http-exception.dto';
import { AtualizarContatoDto } from '../../dtos/contato/atualizar-contato.dto';

@Injectable()
export class ContatoService {
  constructor(private readonly prisma: PrismaService) {}
  async getById(id: string) {
    return await this.prisma.contato.findUnique({
      where: { id: id || undefined },
      include: {
        telefones: { select: { ddd: true, numero: true, whatsapp: true } },
        usuario: {
          select: { username: true, email: true, senha: true, roles: true },
        },
      },
    });
  }
  async get(where?: Prisma.ContatoWhereInput, include?: Prisma.ContatoInclude) {
    return await this.prisma.contato.findMany({
      where: where || undefined,
      include: include || {
        telefones: { select: { ddd: true, numero: true, whatsapp: true } },
        usuario: {
          select: { username: true, email: true, senha: true, roles: true },
        },
      },
    });
  }
  async post({ nome: nome, telefones }: CriarContatoDto) {
    return await this.prisma.contato.create({
      data: {
        nome: nome,

        telefones: { create: telefones },
      },
      include: {
        telefones: { select: { ddd: true, numero: true, whatsapp: true } },
        usuario: {
          select: { username: true, email: true, senha: true, roles: true },
        },
      },
    });
  }
  async put(id: string, { nome: contato }: AtualizarContatoDto) {
    return await this.prisma.contato.update({
      where: { id: id || undefined },
      data: contato,
      include: {
        telefones: { select: { ddd: true, numero: true, whatsapp: true } },
        usuario: {
          select: { username: true, email: true, senha: true, roles: true },
        },
      },
    });
  }
  async delete(id: string) {}

  async findTelefones(id: string): Promise<Telefone[]> {
    return await this.prisma.contato
      .findUnique({
        where: { id: id || undefined },
      })
      .telefones();
  }

  async findUsuario(id: string): Promise<Usuario> {
    return await this.prisma.usuario.findUnique({
      where: { contatoId: id || undefined },
    });
  }

  async createTelefone(contatoId: string) {}
}
