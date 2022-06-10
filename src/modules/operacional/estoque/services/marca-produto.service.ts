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

  async getMarcasProduto() {
    return (
      await this.marcaProdutoRepository.find({ select: { nome: true } })
    ).map(tipo => tipo.nome);
  }
}
