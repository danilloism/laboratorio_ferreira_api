import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MarcaProduto } from '../entities/marca-produto.entity';
import { TipoProduto } from '../entities/tipo-produto.entity';

@Injectable()
export class MarcaProdutoService {
  constructor(
    @InjectRepository(MarcaProduto)
    private readonly marcaProdutoRepository: Repository<MarcaProduto>,
  ) {}

  async find() {
    return (
      await this.marcaProdutoRepository.find({ select: { nome: true } })
    ).map(tipo => tipo.nome);
  }

  async findByNome(nome: string) {
    return await this.marcaProdutoRepository.findOne({ where: { nome } });
  }

  async update() {}

  async create() {}

  async delete() {}
}
