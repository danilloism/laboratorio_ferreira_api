import { Injectable } from '@nestjs/common';
import { Contato, PrismaService, Telefone } from '../../sistema/prisma';
import { TelefoneDto } from '../dtos/telefone/telefone.dto';

@Injectable()
export class TelefoneService {
  constructor(private readonly prisma: PrismaService) {}

  async getContato(telefone: TelefoneDto): Promise<Contato> {
    return await this.prisma.telefone
      .findUnique({
        where: {
          ddd_numero: { ddd: telefone.ddd || 62, numero: telefone.numero },
        },
      })
      .contato();
  }

  async update(telefone: TelefoneDto): Promise<Telefone> {
    return await this.prisma.telefone.update({
      where: { ddd_numero: { ddd: telefone.ddd, numero: telefone.numero } },
      data: telefone,
    });
  }

  async create(telefone: TelefoneDto, contatoId: string) {
    return await this.prisma.telefone.create({
      data: {
        ddd: telefone.ddd || 62,
        numero: telefone.numero,
        contato: { connect: { id: contatoId } },
      },
    });
  }
}
