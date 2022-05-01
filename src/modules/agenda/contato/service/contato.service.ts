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

@Injectable()
export class ContatoService {
  constructor(private readonly prismaService: PrismaService) {}
  async findOne(id: string) {
    return await this.prismaService.contato.findUnique({
      where: { id: id },
      include: {
        usuario: {
          select: { username: true, email: true, senha: true },
        },
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
      const senha = await PasswordHelper.encrypt(usuario.senha);
      Object.assign(usuario, { ...usuario, senha: senha });
    }

    return await this.prismaService.contato
      .create({
        data: {
          nome,
          telefone: telefone.toString(),
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
      .catch(err => {
        const erro: PrismaException = err;
        const target = erro.meta['target'] ?? undefined;
        if (target == 'numero') {
          throw new UnprocessableEntityException(
            'Telefone já está cadastrado e associado a um contato.',
          );
        } else if (target == 'username' || target == 'email') {
          throw new UnprocessableEntityException(
            'Credenciais de usuário (email ou username) já cadastradas e associadas a um contato.',
          );
        }

        throw new InternalServerErrorException(
          'Erro desconhecido ao tentar criar contato.',
        );
      });
  }

  async update(id: string, atualizarContatoDto: UpdateContatoDto) {
    const valida = this.findOne(id);
    if (!valida) {
      throw new NotFoundException('Id informado não existe.');
    }

    return await this.prismaService.contato
      .update({
        where: { id },
        data: atualizarContatoDto,
      })
      .catch(() => {
        throw new InternalServerErrorException(
          'Erro desconhecido ao tentar atualizar contato.',
        );
      });
  }

  async getUsuario(id: string): Promise<Usuario> {
    return await this.prismaService.usuario.findUnique({
      where: { contatoId: id },
    });
  }
}
