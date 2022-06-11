import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async update() {}

  async create() {}

  async delete() {}
}
