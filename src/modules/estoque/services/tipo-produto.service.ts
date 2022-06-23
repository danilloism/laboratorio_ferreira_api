import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTipoProdutoDto } from '../dtos/create-tipo-produto.dto';
import { UpdateTipoProdutoDto } from '../dtos/update-tipo-produto.dto';
import { TipoProduto } from '../entities/tipo-produto.entity';

@Injectable()
export class TipoProdutoService {
  constructor(
    @InjectRepository(TipoProduto)
    private readonly tipoProdutoRepository: Repository<TipoProduto>,
  ) {}

  async find() {
    return (
      await this.tipoProdutoRepository.find({ select: { nome: true } })
    ).map(tipo => tipo.nome);
  }

  async findByNome(nome: string) {
    return await this.tipoProdutoRepository.findOne({ where: { nome } });
  }

  async update(nome: string, updateTipoDto: UpdateTipoProdutoDto) {
    const tipo = await this.findByNome(nome);

    if (!tipo) {
      throw new NotFoundException('Tipo de produto não encontrado.');
    }

    Object.assign(tipo, updateTipoDto);

    return await this.tipoProdutoRepository.save(tipo);
  }

  async create(createTipoDto: CreateTipoProdutoDto) {
    const jaExisteTipo = await this.findByNome(createTipoDto.nome);

    if (jaExisteTipo) {
      throw new ConflictException('Nome de marca já existe.');
    }

    return await this.tipoProdutoRepository.save(createTipoDto);
  }

  async delete(nome: string) {
    const tipo = await this.findByNome(nome);

    if (!tipo) {
      throw new NotFoundException('Tipo de produto não encontrado.');
    }

    tipo.ativo = false;

    return true;
  }
}
