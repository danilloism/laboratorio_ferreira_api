import { Injectable } from '@nestjs/common';
import { FluxoLancamentoEnum } from '@prisma/client';
import { PrismaService } from '../../data/services/prisma.service';

@Injectable()
export class LancamentoFinanceiroService {
  constructor(private readonly prisma: PrismaService) {}

  async find() {
    await this.prisma.lancamentoFinanceiro.findMany({
      include: { saida: true, parcelas: true, servico: true },
    });
  }

  async findOne(uid: string) {
    await this.prisma.lancamentoFinanceiro.findUnique({ where: { uid } });
  }

  async findByFluxo(fluxo: FluxoLancamentoEnum) {
    await this.prisma.lancamentoFinanceiro.findMany({
      where: { fluxo },
      include: fluxo == FluxoLancamentoEnum.SAIDA ? { saida: true } : undefined,
    });
  }

  async findByParaQuem(contatoUid: string) {
    await this.prisma.lancamentoFinanceiro.findMany({
      where: { saida: { paraQuemUid: contatoUid } },
      include: { saida: { include: { paraQuem: true } } },
    });
  }

  async findByServico(servicoUid: string) {
    await this.prisma.lancamentoFinanceiro.findMany({ where: { servicoUid } });
  }

  async findEntradaByPaciente(pacienteUid: string) {
    return await this.prisma.lancamentoFinanceiro.findMany({
      where: {
        fluxo: FluxoLancamentoEnum.ENTRADA,
        servico: { pacientes: { some: { uid: pacienteUid } } },
      },
      include: { parcelas: { include: { pagamentos: true } } },
    });
  }

  // async createEntrada(createLancamentoEntradaDto: CreateLancamentoEntradaDto) {}
  //
  // async createSaida(createLancamentoSaidaDto: CreateLancamentoSaidaDto) {}
}
