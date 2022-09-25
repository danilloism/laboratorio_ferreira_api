import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, RoleEnum } from '@prisma/client';
import { PrismaService } from 'src/modules/data/services/prisma.service';
import { PasswordService } from '../../common/services/password.service';
import { Uuid } from '../../common/types/uid';
import { CreateAccountDto } from '../dtos/create-account.dto';
import { CreateContatoDto } from '../dtos/create-contato.dto';
import { UpdateContatoDto } from '../dtos/update-contato.dto';
import { UpdateUsuarioDto } from '../dtos/update-usuario.dto';
import AccountEntity from '../entities/account.entity';
import ContatoEntity from '../entities/contato.entity';

@Injectable()
export class ContatoService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly passwordService: PasswordService,
  ) {}

  async findContatoByUid(uid: string): Promise<ContatoEntity> {
    const contato = await this.prismaService.contato.findUnique({
      where: { uid },
      include: { account: true },
    });

    if (!contato) return;

    return ContatoEntity.fromPrisma(contato);
  }

  async findByTelefone(numero: string): Promise<ContatoEntity | undefined> {
    const contato = await this.prismaService.contato.findFirst({
      where: { telefones: { hasSome: numero } },
      include: { account: true },
    });

    return ContatoEntity.fromPrisma(contato);
  }

  async findByRole(
    options?: { uid?: Uuid; include?: Prisma.ContatoInclude },
    ...roles: RoleEnum[]
  ): Promise<(ContatoEntity | undefined) | ContatoEntity[]> {
    if (options?.uid) {
      const contato = await this.prismaService.contato.findFirst({
        where: {
          uid: options.uid,
          categorias: {
            hasEvery: roles,
          },
        },
        include: options.include,
      });
      return ContatoEntity.fromPrisma(contato);
    }

    const contatos = await this.prismaService.contato.findMany({
      where: {
        categorias: {
          hasEvery: roles,
        },
      },
      include: options.include,
    });

    return contatos.map(contato => ContatoEntity.fromPrisma(contato));
  }

  async findContatos(
    take?: number,
    skip?: number,
    nome?: string,
  ): Promise<ContatoEntity[]> {
    const contatos = await this.prismaService.contato.findMany({
      where: nome
        ? { nome: { contains: nome, mode: 'insensitive' } }
        : undefined,
      take: Number.isNaN(take) || !take ? undefined : take,
      skip: Number.isNaN(skip) || !skip ? undefined : skip,
      include: {
        account: true,
      },
    });

    return contatos.map(contato => ContatoEntity.fromPrisma(contato));
  }

  async createContato({
    nome,
    telefones,
    account,
    categorias,
  }: CreateContatoDto): Promise<ContatoEntity> {
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

      novoUsuario.senha = await this.passwordService.encrypt(senha);
    }

    if (await this.telefoneExiste(telefones)) {
      throw new ConflictException('Telefone informado já existe.');
    }

    const contato = await this.prismaService.contato.create({
      data: {
        nome,
        telefones,
        account: account ? { create: novoUsuario } : undefined,
        categorias,
      },
      include: account ? { account: true } : undefined,
    });

    return ContatoEntity.fromPrisma(contato);
  }

  private async telefoneExiste(telefones: string[]): Promise<boolean> {
    for (const telefone of telefones) {
      const existe = await this.findByTelefone(telefone);
      if (existe) return true;
    }
    return false;
  }

  async adicionarTelefones(
    uid: string,
    telefones: string[],
  ): Promise<ContatoEntity> {
    const contato = await this.findContatoByUid(uid);

    if (!contato)
      throw new NotFoundException('Contato informado não encontrado.');

    if (await this.telefoneExiste(telefones))
      throw new ConflictException('Telefone informado já está cadastrado.');

    const updatedContato = await this.prismaService.contato.update({
      where: { uid },
      data: { telefones: { push: telefones } },
    });

    return ContatoEntity.fromPrisma(updatedContato);
  }

  async updateContato(
    uid: string,
    atualizarContatoDto: UpdateContatoDto,
  ): Promise<ContatoEntity> {
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
      include: { account: true },
    });
  }

  async findAccountByContatoUid(uid: string): Promise<AccountEntity> {
    return await this.prismaService.account.findUnique({
      where: { contatoUid: uid },
    });
  }

  async findAccountByEmail(email: string): Promise<AccountEntity> {
    return await this.prismaService.account.findUnique({
      where: { email },
      include: { contato: true },
    });
  }

  async findContatoByEmail(email: string): Promise<ContatoEntity> {
    const contato = await this.prismaService.contato.findFirst({
      where: { account: { email } },
      include: {
        account: true,
      },
    });
    return ContatoEntity.fromPrisma(contato);
  }

  async findUniqueContatoByWhere(
    where: Prisma.ContatoWhereUniqueInput,
    options?: { include?: Prisma.ContatoInclude },
  ): Promise<ContatoEntity> {
    const contato = await this.prismaService.contato.findUnique({
      where,
      include: options?.include,
    });

    return ContatoEntity.fromPrisma(contato);
  }

  async updateAccount(
    contatoUid: string,
    updateAccountDto: UpdateUsuarioDto,
  ): Promise<AccountEntity> {
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
    });
  }

  async createAccount(
    contatoUid: string,
    createAccountDto: CreateAccountDto,
  ): Promise<AccountEntity> {
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

    const senha = await this.passwordService.encrypt(createAccountDto.senha);
    return await this.prismaService.account.create({
      data: {
        email: createAccountDto.email,
        senha,
        contato: { connect: { uid: contatoUid } },
      },
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
