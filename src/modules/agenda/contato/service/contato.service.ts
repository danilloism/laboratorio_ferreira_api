import { Injectable } from '@nestjs/common';
import { Prisma, Telefone, Usuario } from '@prisma/client';
import { PrismaService } from '../../../../modules/sistema/prisma';
import { UpdateContatoDto } from '../dto/update-contato.dto';
import { CreateContatoDto } from '../dto/create-contato.dto';
import { UsuarioService } from 'src/modules/sistema/usuario/usuario.service';
import { PasswordHelper } from 'src/shared/helpers/password.helper';

@Injectable()
export class ContatoService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly usuarioService: UsuarioService,
  ) {}
  async findOne(id: string) {
    return await this.prismaService.contato.findUnique({
      where: { id: id },
      include: {
        telefones: { select: { numero: true, whatsapp: true } },
        usuario: {
          select: { username: true, email: true, senha: true, role: true },
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
        telefones: { select: { numero: true, whatsapp: true } },
        usuario: {
          select: { username: true, email: true, senha: true, role: true },
        },
      },
    });
  }

  async create({ nome, telefones, usuario, categoria }: CreateContatoDto) {
    let senha: string;
    if (usuario) {
      senha = await PasswordHelper.encrypt(usuario.senha);

      Object.assign(usuario, { ...usuario, senha: senha });
    }

    const contato = await this.prismaService.contato.create({
      data: {
        nome,
        telefones: { create: telefones },
        usuario: { create: usuario },
        categoria,
      },
      include: {
        telefones: { select: { numero: true, whatsapp: true } },
        usuario: {
          select: {
            email: true,
            username: true,
            role: true,
            usaEspOdont: true,
          },
        },
      },
    });
    return await this.prismaService.contato.findUnique({
      where: { id: contato.id },
      include: {
        usuario: {
          select: {
            email: true,
            username: true,
            role: true,
            usaEspOdont: true,
          },
        },
        telefones: {
          select: {
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
