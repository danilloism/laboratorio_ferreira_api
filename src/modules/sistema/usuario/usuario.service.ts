import { Injectable } from '@nestjs/common';
import { PrismaService, Usuario } from '../prisma';
import { CriarUsuarioDto } from './dtos/criar-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(private readonly prisma: PrismaService) {}

  async create(usuarioDto: CriarUsuarioDto): Promise<Usuario> {
    const data = {
      ...usuarioDto,
      senha: await bcrypt.hash(usuarioDto.senha, process.env.SALT_KEY),
    };

    const usuario = await this.prisma.usuario.create({ data });
    return { ...usuario, senha: undefined };
  }

  async findByUsername(username: string): Promise<Usuario> {
    return await this.prisma.usuario.findUnique({ where: { username } });
  }

  async findByEmail(email: string): Promise<Usuario> {
    return await this.prisma.usuario.findUnique({ where: { email } });
  }

  async update(username: string, data: Usuario): Promise<Usuario> {
    return await this.prisma.usuario.update({
      where: { username },
      data: data,
    });
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
