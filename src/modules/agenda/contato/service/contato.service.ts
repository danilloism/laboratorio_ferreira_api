import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Categoria, Prisma, Usuario } from '@prisma/client';
import { UpdateContatoDto } from '../dto/update-contato.dto';
import { CreateContatoDto } from '../dto/create-contato.dto';
import { PasswordHelper } from '../../../../shared/helpers/password.helper';
import { PrismaService } from '../../../sistema/prisma/prisma.service';
import { CreateAccountDto } from '../dto/create-account.dto';
import { UpdateAccountDto } from '../dto/update-account.dto';

@Injectable()
export class ContatoService {
  constructor(private readonly prismaService: PrismaService) {}
  async findById(id: string) {
    return await this.prismaService.contato.findUnique({
      where: { id },
    });
  }

  async findByTelefone(telefone: string) {
    return await this.prismaService.contato.findUnique({
      where: { telefone },
    });
  }

  async find(
    where?: Prisma.ContatoWhereInput,
    include?: Prisma.ContatoInclude,
  ) {
    return await this.prismaService.contato.findMany({
      where: where,
      include: include,
    });
  }

  async create({ nome, telefone, usuario, categorias }: CreateContatoDto) {
    if (usuario) {
      const { email, username } = usuario;

      const emailExiste = await this.prismaService.usuario.findUnique({
        where: { email },
      });
      if (emailExiste) {
        throw new ConflictException('Email informado já existe.');
      }

      const usernameExiste = await this.prismaService.usuario.findUnique({
        where: { username },
      });
      if (usernameExiste) {
        throw new ConflictException('Username informado já existe.');
      }

      const senha = await new PasswordHelper(usuario.senha).encrypt();
      Object.assign(usuario, { ...usuario, senha: senha });
    }

    const telefoneExiste = await this.findByTelefone(telefone);
    if (telefoneExiste) {
      throw new ConflictException('Telefone informado já existe.');
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
        throw new InternalServerErrorException('Erro interno do servidor.');
      });
  }

  async update(id: string, atualizarContatoDto: UpdateContatoDto) {
    const contatoExiste = this.findById(id);
    if (!contatoExiste) {
      throw new NotFoundException('Contato não encontrado.');
    }

    return await this.prismaService.contato
      .update({
        where: { id },
        data: atualizarContatoDto,
      })
      .catch(() => {
        throw new InternalServerErrorException('Erro interno do servidor.');
      });
  }

  async getAccount(id: string): Promise<Usuario> {
    const contato = await this.findById(id);

    if (!contato) {
      throw new NotFoundException('Contato não encontrado.');
    }

    return await this.prismaService.usuario.findUnique({
      where: { contatoId: id },
    });
  }

  async getAccountByEmail(email: string): Promise<Usuario> {
    return await this.prismaService.usuario.findUnique({ where: { email } });
  }

  async getAccountByUsername(username: string): Promise<Usuario> {
    return await this.prismaService.usuario.findUnique({ where: { username } });
  }

  async updateAccount(id: string, updateAccountDto: UpdateAccountDto) {
    const contato = await this.findById(id);

    if (!contato) {
      throw new NotFoundException('Contato não encontrado.');
    }

    return await this.prismaService.usuario.update({
      where: { contatoId: id },
      data: updateAccountDto,
    });
  }

  async createAccount(id: string, createAccountDto: CreateAccountDto) {
    const contato = await this.findById(id);
    const accountExiste = await this.getAccount(id);

    if (!contato) {
      throw new NotFoundException('Contato não encontrado.');
    } else if (accountExiste) {
      throw new ConflictException(
        'Conta de usuário já existe para contato informado.',
      );
    }

    const senha = await new PasswordHelper(createAccountDto.senha).encrypt();
    createAccountDto = { ...createAccountDto, senha };

    return await this.prismaService.usuario.create({
      data: { contatoId: id, ...createAccountDto },
    });
  }

  async deleteAccount(id: string): Promise<void> {
    const contato = await this.findById(id);

    if (!contato) {
      throw new NotFoundException('Contato não encontrado.');
    }

    const account = await this.getAccount(id);

    if (!account) {
      throw new NotFoundException('Conta de usuário não encontrada.');
    }

    if (!account.ativo) {
      throw new ConflictException('Conta de usuário já foi deletada.');
    }

    await this.prismaService.usuario.update({
      where: { contatoId: id },
      data: { ativo: false },
    });
  }

  async recoverAccount(id: string): Promise<Usuario> {
    const contato = await this.findById(id);

    if (!contato) {
      throw new NotFoundException('Contato não encontrado.');
    }

    const account = await this.getAccount(id);

    if (!account) {
      throw new NotFoundException('Conta de usuário não encontrada.');
    }

    if (account.ativo) {
      throw new ConflictException('Conta de usuário não está deletada.');
    }

    return await this.prismaService.usuario.update({
      where: { contatoId: id },
      data: { ativo: true },
    });
  }

  async getRoles(id: string): Promise<Categoria[]> {
    const contato = await this.prismaService.contato.findUnique({
      where: { id },
    });

    if (!contato) {
      throw new NotFoundException('Contato não encontrado.');
    }

    return contato.categorias;
  }
}
