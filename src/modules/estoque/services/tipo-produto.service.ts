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

  async getTiposProduto() {
    return (
      await this.tipoProdutoRepository.find({ select: { nome: true } })
    ).map(tipo => tipo.nome);
  }
}
