import { Injectable } from '@nestjs/common';
import { Prisma, Telefone, Usuario } from '@prisma/client';
import { PrismaService } from '../../../../modules/sistema/prisma';
import { UpdateContatoDto } from '../dto/update-contato.dto';
import { CreateContatoDto } from '../dto/create-contato.dto';
import { UsuarioService } from 'src/modules/sistema/usuario/usuario.service';

@Injectable()
export class ContatoService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly usuarioService: UsuarioService,
  ) {}
  async findOne(id: string) {
    return await this.prismaService.contato.findUnique({
      where: { id: id || undefined },
      include: {
        telefones: { select: { ddd: true, numero: true, whatsapp: true } },
        usuario: {
          select: { username: true, email: true, senha: true, roles: true },
        },
      },
    });
  }
  async find(
    where?: Prisma.ContatoWhereInput,
    include?: Prisma.ContatoInclude,
  ) {
    return await this.prismaService.contato.findMany({
      where: where || undefined,
      include: include || {
        telefones: { select: { ddd: true, numero: true, whatsapp: true } },
        usuario: {
          select: { username: true, email: true, senha: true, roles: true },
        },
      },
    });
  }

  async create(data: CreateContatoDto) {
    const contato = await this.prismaService.contato.create({
      data: {
        nome: data.nome,
        telefones: { create: data.telefones },
      },
    });

    if (data.usuario) {
      Object.assign(data.usuario, { ...data.usuario, contatoId: contato.id });
      await this.usuarioService.create(data.usuario).catch(async err => {
        await this.prismaService.contato
          .delete({ where: { id: contato.id } })
          .catch(err => {
            throw err;
          });
        throw err;
      });
    }

    return await this.prismaService.contato.findUnique({
      where: { id: contato.id },
      include: {
        usuario: {
          select: {
            email: true,
            username: true,
            roles: true,
            usaEspOdont: true,
          },
        },
        telefones: {
          select: {
            ddd: true,
            numero: true,
            whatsapp: true,
          },
        },
      },
    });
  }

  async updateNome(id: string, atualizarContatoDto: UpdateContatoDto) {
    return await this.prismaService.contato.update({
      where: { id: id },
      data: { nome: atualizarContatoDto.nome },
    });
  }

  async getTelefones(id: string): Promise<Telefone[]> {
    return await this.prismaService.contato
      .findUnique({
        where: { id: id },
      })
      .telefones();
  }

  async getUsuario(id: string): Promise<Usuario> {
    return await this.prismaService.usuario.findUnique({
      where: { contatoId: id },
    });
  }
}
