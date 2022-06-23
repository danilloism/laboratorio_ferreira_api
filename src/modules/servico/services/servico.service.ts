import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriaHelper } from 'src/modules/agenda/contato/helpers/categoria.helper';
import { ContatoService } from 'src/modules/agenda/contato/service/contato.service';
import { CurrencyHelper } from 'src/modules/common/helpers/currency.helper';
import { ProdutoService } from 'src/modules/estoque/services/produto.service';
import { Repository } from 'typeorm';
import { CreateServicoDto } from '../dtos/create-servico.dto';
import { EtapaFabricacao } from '../entities/etapa-fabricacao.entity';
import { ItemServico } from '../entities/item-servico.entity';
import { Servico } from '../entities/servico.entity';

@Injectable()
export class ServicoService {
  constructor(
    @InjectRepository(Servico)
    private readonly servicoRepository: Repository<Servico>,
    @InjectRepository(ItemServico)
    private readonly itemServicoRepository: Repository<ItemServico>,
    @InjectRepository(EtapaFabricacao)
    private readonly etapaFabricacaoRepository: Repository<EtapaFabricacao>,
    private readonly produtoService: ProdutoService,
    private readonly contatoService: ContatoService,
  ) {}

  async find() {
    return await this.servicoRepository.find();
  }

  async findById(id: string) {
    return await this.servicoRepository.findOne({ where: { id } });
  }

  async findByDentista(dentistaId: string) {
    const dentista = await this.contatoService.findById(dentistaId);

    if (!dentista) {
      throw new NotFoundException('Dentista não encontrado.');
    }

    return await this.servicoRepository.find({
      where: { dentista: { id: dentistaId } },
    });
  }

  async findByPaciente(pacienteId: string) {
    const paciente = await this.contatoService.findById(pacienteId);

    if (!paciente) {
      throw new NotFoundException('Paciente não encontrado.');
    }

    return await this.servicoRepository.find({
      where: { paciente: { id: pacienteId } },
    });
  }

  async create(createServicoDto: CreateServicoDto) {
    const servico = this.servicoRepository.create();

    const dentista = await this.contatoService.findById(
      createServicoDto.dentistaId,
    );
    if (!dentista) {
      throw new NotFoundException('Dentista não encontrado.');
    }

    if (
      !CategoriaHelper.isDentistaEspOdont(dentista) &&
      createServicoDto.espOdont
    ) {
      throw new ConflictException(
        'Dentista informado não é colaborador do Espaço Odontológico.',
      );
    }

    servico.dentista = dentista;

    if (createServicoDto.pacienteId) {
      const paciente = await this.contatoService.findById(
        createServicoDto.pacienteId,
      );
      if (!paciente) {
        throw new NotFoundException('Paciente não encontrado.');
      }
      servico.paciente = paciente;
    }

    const valorTotal = CurrencyHelper.createCurrencyInstance(0);

    const itensServico = await Promise.all(
      createServicoDto.produtos.map(async itemServico => {
        const produto = await this.produtoService.findById(
          itemServico.produtoId,
        );
        if (!produto) {
          throw new NotFoundException('Produto não encontrado.');
        }

        const item = this.itemServicoRepository.create({
          produto,
          servico,
          quantidade: itemServico.quantidade,
          desconto: itemServico.desconto,
        });

        const valor = CurrencyHelper.createCurrencyInstance(0);

        if (createServicoDto.espOdont) {
          valor.add(produto.valor.espOdont);
        } else {
          valor.add(produto.valor.cliente);
        }

        valor.multiply(item.quantidade);
        valor.subtract(item.desconto ?? 0);
        valorTotal.add(valor);

        const etapa = await this.etapaFabricacaoRepository.findOne({
          where: { nome: 'recebido' },
        });

        item.etapaFabricacao =
          etapa ||
          (await this.etapaFabricacaoRepository.save({
            nome: 'recebido',
          }));

        return item;
      }),
    );

    servico.itensServico = itensServico;
    Object.assign(servico, {
      descricao: createServicoDto.descricao,
      observacoes: createServicoDto.observacoes,
      espOdont: createServicoDto.espOdont,
    });

    return await this.servicoRepository.save(servico);
  }
}
