import { Injectable } from '@nestjs/common';
import { PrismaService, Telefone } from 'src/modules/sistema/prisma';

@Injectable()
export class TelefoneService {
  constructor(private readonly prisma: PrismaService) {}

  async getTelefone(ddd: number, numero: number): Promise<Telefone> {
    return await this.prisma.telefone.findUnique({
      where: { ddd_numero: { ddd, numero } || undefined },
    });
  }
}
