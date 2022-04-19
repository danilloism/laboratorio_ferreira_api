import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CriarContatoDto } from '../../dtos/contato/criar-contato.dto';
import { AtualizarContatoDto } from '../../dtos/contato/atualizar-contato.dto';
import { PrismaService } from '../../../sistema/prisma';
import { Contato } from '@prisma/client';

@Injectable()
export class ContatoService {
  constructor(private readonly prisma: PrismaService) {}
  async getById(id: string) {
    return await this.prisma.contato.findUnique({ where: { id } });
  }
  async get() {
    return await this.prisma.contato.findMany();
  }
  async post(contato: CriarContatoDto) {
    return await this.prisma.contato.create({
      data: { name: contato.nome, categoria: contato.categoria },
    });
  }
  async put(id: string, contato: AtualizarContatoDto) {}
  async delete(id: string) {}
}
