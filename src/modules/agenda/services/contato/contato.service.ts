import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CriarContatoDto } from '../../dtos/contato/criar-contato.dto';
import { PrismaService } from '../../../sistema/prisma';
import { Contato } from '@prisma/client';
import { ResultDto } from '../../../../shared/dtos/result.dto';
import { ServiceHttpExceptionDto } from 'src/shared/dtos/service-http-exception.dto';
import { AtualizarContatoDto } from '../../dtos/contato/atualizar-contato.dto';

@Injectable()
export class ContatoService {
  constructor(private readonly prisma: PrismaService) {}
  async getById(id: string) {
    const contato = await this.prisma.contato.findUnique({
      where: { id },
      include: { telefones: true, usuario: true },
    });

    //TODO: resolver isso aqui
    if (!contato) {
      throw new ServiceHttpExceptionDto(
        'Contato não encontrado.',
        HttpStatus.NOT_FOUND,
      );
    }

    return contato;
  }
  async get() {
    return await this.prisma.contato.findMany({
      include: { telefones: true, usuario: true },
    });
  }
  async post({ contato, telefones }: CriarContatoDto) {
    return await this.prisma.contato.create({
      data: {
        nome: contato.nome,
        categoria: contato.categoria,
        usaEspOdont: contato.usaEspOdont,
        telefones: { create: telefones },
      },
      include: { telefones: true, usuario: true },
    });
  }
  async put(id: string, { contato }: AtualizarContatoDto) {
    return await this.prisma.contato.update({
      where: { id: id },
      data: contato,
      include: { telefones: true, usuario: true },
    });
  }
  async delete(id: string) {}
}
