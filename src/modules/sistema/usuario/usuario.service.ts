import { Injectable } from '@nestjs/common';
import { PasswordHelper } from 'src/shared/helpers/password.helper';
import { PrismaService, Usuario } from '../prisma';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(private readonly prisma: PrismaService) {}

  async create(criarUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const data = {
      ...criarUsuarioDto,
      senha: await PasswordHelper.encrypt(criarUsuarioDto.senha),
    };

    return await this.prisma.usuario.create({ data });
  }

  async findByUsername(username: string): Promise<Usuario> {
    return await this.prisma.usuario.findUnique({
      where: { username },
    });
  }

  async findByEmail(email: string): Promise<Usuario> {
    return await this.prisma.usuario.findUnique({
      where: { email },
    });
  }

  async update(id: string, data: Usuario): Promise<Usuario> {
    return this.prisma.usuario.update({
      where: { contatoId: id },
      data: data,
    });
  }

  async findAll(): Promise<Usuario[]> {
    return await this.prisma.usuario.findMany();
  }

  //   async authenticate(username: string, senha: string): Promise<Contato> {
  //     let contato = await this.findByUsername(username);

  //     const pass = await Md5.init(`${senha}${process.env.SALT_KEY}`);
  //     if (pass.toString() == customer.user.password.toString()) {
  //       return customer;
  //     } else {
  //       return null;
  //     }
  //   }
}
