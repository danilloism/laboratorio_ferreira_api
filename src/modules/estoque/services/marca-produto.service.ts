import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMarcaProdutoDto } from '../dtos/create-marca-produto.dto';
import { UpdateMarcaProdutoDto } from '../dtos/update-marca-produto.dto';
import { UpdateTipoProdutoDto } from '../dtos/update-tipo-produto.dto';
import { MarcaProduto } from '../entities/marca-produto.entity';

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

  async update(nome: string, updateMarcaDto: UpdateMarcaProdutoDto) {
    const marca = await this.findByNome(nome);

    if (!marca) {
      throw new NotFoundException('Marca de produto não encontrada.');
    }

    Object.assign(marca, updateMarcaDto);

    return await this.marcaProdutoRepository.save(marca);
  }

  async create(createMarcaDto: CreateMarcaProdutoDto) {
    const jaExisteMarca = await this.findByNome(createMarcaDto.nome);

    if (jaExisteMarca) {
      throw new ConflictException('Nome de marca já existe.');
    }

    return await this.marcaProdutoRepository.save(createMarcaDto);
  }

  async delete(nome: string) {
    const marca = await this.findByNome(nome);

    if (!marca) {
      throw new NotFoundException('Marca de produto não encontrada.');
    }

    marca.ativo = false;

    return true;
  }
}
