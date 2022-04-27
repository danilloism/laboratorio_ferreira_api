import { Injectable } from '@nestjs/common';
import { PrismaService, Usuario } from '../prisma';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(private readonly prisma: PrismaService) {}

  async create(criarUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const data = {
      ...criarUsuarioDto,
      senha: await bcrypt.hash(criarUsuarioDto.senha, process.env.SALT_KEY),
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
