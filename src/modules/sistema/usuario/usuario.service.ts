import { Injectable } from '@nestjs/common';
import { Usuario } from '@prisma/client';
import { PasswordHelper } from '../../../shared/helpers/password.helper';
import { PrismaService } from '../prisma/prisma.service';
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
    return await this.prisma.usuario.update({
      where: { contatoId: id },
      data: data,
    });
  }

  async getRoles(id: string) {
    const contato = await this.prisma.contato.findUnique({ where: { id } });
    return contato.categorias;
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
