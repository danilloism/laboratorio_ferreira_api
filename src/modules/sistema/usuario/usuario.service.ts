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

    const usuario = await this.prisma.usuario.create({ data });
    return { ...usuario, senha: undefined };
  }

  async findByUsername(username: string): Promise<Usuario> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { username },
    });
    return { ...usuario, senha: undefined };
  }

  async findByEmail(email: string): Promise<Usuario> {
    const usuario = await this.prisma.usuario.findUnique({ where: { email } });
    return { ...usuario, senha: undefined };
  }

  async update(username: string, data: Usuario): Promise<Usuario> {
    const result = await this.prisma.usuario.update({
      where: { username },
      data: data,
    });

    return { ...result, senha: undefined };
  }

  async findAll(): Promise<Usuario[]> {
    const result = await this.prisma.usuario.findMany();
    result.forEach(usuario => {
      usuario.senha = undefined;
    });
    return result;
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
