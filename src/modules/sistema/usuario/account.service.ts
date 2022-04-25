import { Injectable } from '@nestjs/common';
import { PrismaService, Usuario } from '../prisma';
// import {} from 'md5'

@Injectable()
export class AccountService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Usuario): Promise<Usuario> {
    return await this.prisma.usuario.create({ data: data });
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
