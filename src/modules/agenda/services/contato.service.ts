import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, RoleEnum } from '@prisma/client';
import { PrismaService } from 'src/modules/data/services/prisma.service';
import { PasswordHelperV2 } from '../../common/helpers/password.helper';
import { Uuid } from '../../common/types/uid';
import { CreateAccountDto } from '../dtos/create-account.dto';
import { CreateContatoDto } from '../dtos/create-contato.dto';
import { UpdateContatoDto } from '../dtos/update-contato.dto';
import { UpdateUsuarioDto } from '../dtos/update-usuario.dto';
import { ContatoType } from '../types/contato.type';

@Injectable()
export class ContatoService {
  constructor(private readonly prismaService: PrismaService) {}

  private readonly usuarioSelect = {
    contatoUid: true,
    email: true,
    criadoEm: true,
    atualizadoEm: true,
  };

  async findContatoByUid(uid: string, options?: { showPassword: boolean }) {
    return await this.prismaService.contato.findUnique({ where: { uid } });
  }

  async findByTelefone(numero: string) {
    return await this.prismaService.contato.findFirst({
      where: { telefones: { hasSome: numero } },
    });
  }

  async findByRole(
    options?: { uid?: Uuid; include?: Prisma.ContatoInclude },
    ...roles: RoleEnum[]
  ): Promise<ContatoType | ContatoType[]> {
    if (options?.uid) {
      return this.prismaService.contato.findFirst({
        where: {
          uid: options.uid,
          categorias: {
            hasEvery: roles,
          },
        },
        include: options.include,
      });
    }

    return this.prismaService.contato.findMany({
      where: {
        categorias: {
          hasEvery: roles,
        },
      },
      include: options.include,
    });
  }

  async findContatos(take?: number, skip?: number, nome?: string) {
    return await this.prismaService.contato.findMany({
      where: nome
        ? { nome: { contains: nome, mode: 'insensitive' } }
        : undefined,
      take: Number.isNaN(take) ? undefined : take,
      skip: Number.isNaN(skip) ? undefined : skip,
    });
  }

  async createContato({
    nome,
    telefones,
    account,
    categorias,
  }: CreateContatoDto) {
    const novoUsuario = {
      email: account?.email,
      senha: account?.senha,
    };

    if (account) {
      const { email, senha } = account;

      const emailExiste = await this.prismaService.account.findUnique({
        where: { email },
      });
      if (emailExiste) {
        throw new ConflictException('Email informado já existe.');
      }

      novoUsuario.senha = await PasswordHelperV2.encrypt(senha);
    }

    const telefoneExiste = async () => {
      for (const telefone of telefones) {
        const existe = await this.findByTelefone(telefone);
        if (existe) return true;
      }
      return false;
    };

    if (await telefoneExiste()) {
      throw new ConflictException('Telefone informado já existe.');
    }

    return await this.prismaService.contato.create({
      data: {
        nome,
        telefones,
        account: account ? { create: novoUsuario } : undefined,
        categorias,
      },
      include: account
        ? { account: { select: this.usuarioSelect } }
        : undefined,
    });
  }

  async updateContato(uid: string, atualizarContatoDto: UpdateContatoDto) {
    const contato = await this.findContatoByUid(uid);
    if (!contato) {
      throw new NotFoundException('Contato não encontrado.');
    }

    return await this.prismaService.contato.update({
      where: { uid: uid },
      data: {
        nome:
          atualizarContatoDto.nome != null
            ? atualizarContatoDto.nome
            : undefined,
        categorias:
          atualizarContatoDto.categorias != null
            ? atualizarContatoDto.categorias
            : undefined,
        ativo:
          atualizarContatoDto.ativo != null
            ? atualizarContatoDto.ativo
            : undefined,
      },
    });
  }

  async findAccountByContatoUid(uid: string) {
    return await this.prismaService.account.findUnique({
      where: { contatoUid: uid },
    });
  }

  async findAccountByEmail(email: string) {
    return await this.prismaService.account.findUnique({
      where: { email },
      include: { contato: true },
    });
  }

  async findUniqueContatoByWhere(
    where: Prisma.ContatoWhereUniqueInput,
    options?: { include?: Prisma.ContatoInclude },
  ) {
    return await this.prismaService.contato.findUnique({
      where,
      include: options?.include,
    });
  }

  async updateAccount(contatoUid: string, updateAccountDto: UpdateUsuarioDto) {
    const account = await this.prismaService.account.findUnique({
      where: { contatoUid },
    });

    if (!account) {
      throw new NotFoundException('Conta de usuário não encontrada.');
    }

    Object.assign(account, updateAccountDto);

    return await this.prismaService.account.update({
      where: { contatoUid },
      data: account,
      select: this.usuarioSelect,
    });
  }

  async createAccount(contatoUid: string, createAccountDto: CreateAccountDto) {
    const contato = await this.prismaService.contato.findUnique({
      where: { uid: contatoUid },
      include: { account: true },
    });
    if (!contato) {
      throw new NotFoundException('Contato não encontrado.');
    }
    if (contato.account) {
      throw new ConflictException(
        'Conta de usuário já existe para agenda informado.',
      );
    }

    const senha = await PasswordHelperV2.encrypt(createAccountDto.senha);
    return await this.prismaService.account.create({
      data: {
        email: createAccountDto.email,
        senha,
        contato: { connect: { uid: contatoUid } },
      },
      select: this.usuarioSelect,
    });
  }

  async deleteAccount(contatoUid: string): Promise<boolean> {
    const account = await this.findAccountByContatoUid(contatoUid);

    if (!account) {
      throw new NotFoundException('Conta de usuário não encontrada.');
    }

    await this.prismaService.account.delete({
      where: { contatoUid: contatoUid },
    });
    return true;
  }
}
