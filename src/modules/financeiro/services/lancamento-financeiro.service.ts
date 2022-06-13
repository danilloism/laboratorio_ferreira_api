import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contato } from 'src/modules/agenda/contato/entities/contato.entity';
import { Servico } from 'src/modules/servico/entities/servico.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateLancamentoEntradaDto } from '../dtos/create-lancamento-entrada.dto';
import { CreateLancamentoSaidaDto } from '../dtos/create-lancamento-saida.dto';
import { LancamentoFinanceiro } from '../entities/lancamento-financeiro.entity';
import { Parcela } from '../entities/parcela.entity';
import { FluxoPagamentoEnum } from '../enums/fluxo-pagamento.enum';

@Injectable()
export class LancamentoFinanceiroService {
  constructor(
    @InjectRepository(LancamentoFinanceiro)
    private readonly lancamentoFinanceiroRepository: Repository<LancamentoFinanceiro>,
    @InjectRepository(Parcela)
    private readonly parcelaRepository: Repository<Parcela>,
    private readonly dtSource: DataSource,
  ) {}

  async find() {
    await this.lancamentoFinanceiroRepository.find();
  }

  async findOne(id: string) {
    await this.lancamentoFinanceiroRepository.findOne({ where: { id } });
  }

  async findByFluxo(fluxo: FluxoPagamentoEnum) {
    await this.lancamentoFinanceiroRepository.find({
      where: { fluxo },
    });
  }

  async findByParaQuem(contatoId: string) {
    await this.lancamentoFinanceiroRepository.find({
      where: { paraQuem: { id: contatoId } },
    });
  }

  async findByServico(servicoId: string) {
    await this.lancamentoFinanceiroRepository.find({
      where: { servico: { id: servicoId } },
    });
  }

  async findByPaciente(pacienteId: string) {
    const lancamentos = await this.dtSource
      .createQueryBuilder()
      .from(LancamentoFinanceiro, 'lancamento')
      .leftJoin(Servico, 'servico', 'servico.id = lancamento.servicoId')
      .leftJoin(Contato, 'paciente', 'servico.pacienteId = paciente.id')
      .where('paciente.id = :id', { id: pacienteId })
      .getRawMany();

    return lancamentos;
  }

  async createEntrada(createLancamentoEntradaDto: CreateLancamentoEntradaDto) {}

  async createSaida(createLancamentoSaidaDto: CreateLancamentoSaidaDto) {}
}
