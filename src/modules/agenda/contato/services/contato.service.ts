import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/modules/data/services/prisma.service';
import { PasswordHelperV2 } from '../../../common/helpers/password.helper';
import { CreateContatoDto } from '../dtos/create-contato.dto';
import { CreateUsuarioDto } from '../dtos/create-usuario.dto';
import { UpdateContatoDto } from '../dtos/update-contato.dto';
import { UpdateUsuarioDto } from '../dtos/update-usuario.dto';

@Injectable()
export class ContatoService {
  constructor(private readonly prismaService: PrismaService) {}

  private readonly usuarioSelect = {
    email: true,
    username: true,
    criadoEm: true,
    atualizadoEm: true,
  };

  async findContatoByUid(uid: string) {
    return await this.prismaService.contato.findUnique({
      where: { uid },
      include: {
        usuario: {
          select: this.usuarioSelect,
        },
      },
    });
  }

  async findByTelefone(numero: string) {
    return await this.prismaService.contato.findMany({
      where: { telefones: { hasSome: numero } },
    });
  }

  async findContatos(take?: number, skip?: number, nome?: string) {
    return await this.prismaService.contato.findMany({
      include: {
        usuario: {
          select: this.usuarioSelect,
        },
      },
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
    usuario,
    categorias,
  }: CreateContatoDto) {
    const novoUsuario = {
      email: usuario?.email,
      username: usuario?.username,
      senha: usuario?.senha,
    };

    if (usuario) {
      const { email, username } = usuario;

      const emailExiste = await this.prismaService.usuario.findUnique({
        where: { email },
      });
      if (emailExiste) {
        throw new ConflictException('Email informado já existe.');
      }

      if (username) {
        const usernameExiste = await this.prismaService.usuario.findUnique({
          where: { username: username },
        });
        if (usernameExiste) {
          throw new ConflictException('Username informado já existe.');
        }
      }

      novoUsuario.senha = await PasswordHelperV2.encrypt(usuario.senha);
    }

    const telefoneExiste = async () => {
      for (const telefone of telefones) {
        const existe = (await this.findByTelefone(telefone)).length > 0;
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
        usuario: usuario ? { create: novoUsuario } : undefined,
        categorias,
      },
      include: {
        usuario: usuario ? { select: this.usuarioSelect } : undefined,
      },
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
      include: { usuario: true },
    });
  }

  async findAccountByContatoUid(uid: string) {
    const contato = await this.findContatoByUid(uid);

    if (!contato) {
      throw new NotFoundException('Contato não encontrado.');
    }
    return contato.usuario;
  }

  async findAccountByEmail(email: string) {
    return await this.prismaService.usuario.findUnique({
      where: { email },
      include: { contato: true },
    });
  }

  async findAccountByUsername(username: string) {
    return await this.prismaService.usuario.findUnique({
      where: { username },
      include: { contato: true },
    });
  }

  async updateAccount(contatoUid: string, updateAccountDto: UpdateUsuarioDto) {
    const account = await this.prismaService.usuario.findUnique({
      where: { contatoUid },
    });

    if (!account) {
      throw new NotFoundException('Conta de usuário não encontrada.');
    }

    Object.assign(account, updateAccountDto);

    return await this.prismaService.usuario.update({
      where: { contatoUid },
      data: account,
      select: this.usuarioSelect,
    });
  }

  async createAccount(contatoUid: string, createAccountDto: CreateUsuarioDto) {
    const contato = await this.prismaService.contato.findUnique({
      where: { uid: contatoUid },
      include: { usuario: true },
    });
    if (!contato) {
      throw new NotFoundException('Contato não encontrado.');
    }
    if (contato.usuario) {
      throw new ConflictException(
        'Conta de usuário já existe para contato informado.',
      );
    }

    const senha = await PasswordHelperV2.encrypt(createAccountDto.senha);
    return await this.prismaService.usuario.create({
      data: {
        ...createAccountDto,
        senha,
        contato: { connect: { uid: contatoUid } },
      },
      select: this.usuarioSelect,
    });
  }

  async deleteAccount(contatoId: string): Promise<boolean> {
    const account = await this.findAccountByContatoUid(contatoId);

    if (!account) {
      throw new NotFoundException('Conta de usuário não encontrada.');
    }

    await this.prismaService.usuario.delete({
      where: { contatoUid: contatoId },
    });
    return true;
  }

  async getRoles(id: string) {
    const contato = await this.findContatoByUid(id);

    if (!contato) {
      throw new NotFoundException('Contato não encontrado.');
    }

    return contato.categorias;
  }
}
