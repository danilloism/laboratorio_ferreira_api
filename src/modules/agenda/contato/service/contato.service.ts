import { Injectable } from '@nestjs/common';
import { Prisma, Telefone, Usuario } from '@prisma/client';
import { PrismaService } from '../../../../modules/sistema/prisma';
import { UpdateContatoDto } from '../dto/update-contato.dto';
import { CreateContatoDto } from '../dto/create-contato.dto';

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
  async post(criarContatoDto: CreateContatoDto) {
    return await this.prisma.contato.create({
      data: {
        nome: criarContatoDto.nome,

        telefones: { create: criarContatoDto.telefones },
      },
      include: {
        telefones: { select: { ddd: true, numero: true, whatsapp: true } },
        usuario: {
          select: { username: true, email: true, senha: true, roles: true },
        },
      },
    });
  }
  async put(id: string, atualizarContatoDto: UpdateContatoDto) {
    return await this.prisma.contato.update({
      where: { id: id },
      data: { nome: atualizarContatoDto.nome },
    });
  }
  async delete(id: string) {
    return null;
  }

  async findTelefones(id: string): Promise<Telefone[]> {
    return await this.prisma.contato
      .findUnique({
        where: { id: id },
      })
      .telefones();
  }

  async findUsuario(id: string): Promise<Usuario> {
    return await this.prisma.usuario.findUnique({
      where: { contatoId: id },
    });
  }

  async createTelefone(contatoId: string) {
    return null;
  }
}
