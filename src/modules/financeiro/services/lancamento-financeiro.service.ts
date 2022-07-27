import { Injectable } from '@nestjs/common';

@Injectable()
export class LancamentoFinanceiroService {
  //
  // async find() {
  //   await this.lancamentoFinanceiroRepository.find();
  // }
  //
  // async findOne(id: string) {
  //   await this.lancamentoFinanceiroRepository.findOne({ where: { id } });
  // }
  //
  // async findByFluxo(fluxo: FluxoPagamentoEnum) {
  //   await this.lancamentoFinanceiroRepository.find({
  //     where: { fluxo },
  //   });
  // }
  //
  // async findByParaQuem(contatoId: string) {
  //   await this.lancamentoFinanceiroRepository.find({
  //     where: { paraQuem: { id: contatoId } },
  //   });
  // }
  //
  // async findByServico(servicoId: string) {
  //   await this.lancamentoFinanceiroRepository.find({
  //     where: { servico: { id: servicoId } },
  //   });
  // }
  //
  // async findEntradaByPaciente(pacienteId: string) {
  //   const lancamentos = await this.dtSource
  //   .createQueryBuilder()
  //   .from(LancamentoFinanceiro, 'lancamento')
  //   .leftJoin(Servico, 'servico', 'servico.id = lancamento.servicoId')
  //   .leftJoin(ContatoEntity, 'paciente', 'servico.pacienteId = paciente.id')
  //   .where('paciente.id = :id', { id: pacienteId })
  //   .andWhere('lancamento.fluxo = "entrada"')
  //   .getRawMany();
  //
  //   return lancamentos;
  // }
  //
  // async createEntrada(createLancamentoEntradaDto: CreateLancamentoEntradaDto) {}
  //
  // async createSaida(createLancamentoSaidaDto: CreateLancamentoSaidaDto) {}
}
