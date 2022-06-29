import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../data/services/prisma.service';
import { CreateMarcaProdutoDto } from '../dtos/create-marca-produto.dto';
import { UpdateMarcaProdutoDto } from '../dtos/update-marca-produto.dto';

@Injectable()
export class MarcaProdutoService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {
  }

  async find(): Promise<string[]> {
    return (
      await this.prismaService.marcaProduto.findMany({ select: { nome: true } })
    ).map(tipo => tipo.nome);
  }

  async findByNome(nome: string) {
    return await this.prismaService.marcaProduto.findUnique({ where: { nome } });
  }

  async update(nome: string, updateMarcaDto: UpdateMarcaProdutoDto) {
    const marca = await this.findByNome(nome);

    if (!marca) {
      throw new NotFoundException('Marca de produto não encontrada.');
    }

    Object.assign(marca, updateMarcaDto);

    return await this.prismaService.marcaProduto.update({
      where: { nome },
      data: marca,
    });
  }

  async create(createMarcaDto: CreateMarcaProdutoDto) {
    const jaExisteMarca = await this.findByNome(createMarcaDto.nome);

    if (jaExisteMarca) {
      throw new ConflictException('Nome de marca já existe.');
    }

    return await this.prismaService.marcaProduto.create({ data: createMarcaDto });
  }

  async delete(nome: string): Promise<boolean> {
    const marca = await this.findByNome(nome);

    if (!marca) {
      throw new NotFoundException('Marca de produto não encontrada.');
    }

    await this.update(nome, { ativo: false });
    return true;
  }
}
