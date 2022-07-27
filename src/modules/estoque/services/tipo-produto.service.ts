import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../data/services/prisma.service';
import { CreateTipoProdutoDto } from '../dtos/create-tipo-produto.dto';
import { UpdateTipoProdutoDto } from '../dtos/update-tipo-produto.dto';

@Injectable()
export class TipoProdutoService {
  constructor(private readonly prismaService: PrismaService) {}

  async find(): Promise<string[]> {
    return (
      await this.prismaService.tipoProduto.findMany({ select: { nome: true } })
    ).map(tipo => tipo.nome);
  }

  async findByNome(nome: string) {
    return await this.prismaService.tipoProduto.findUnique({ where: { nome } });
  }

  async update(nome: string, updateTipoDto: UpdateTipoProdutoDto) {
    const tipo = await this.findByNome(nome);

    if (!tipo) {
      throw new NotFoundException('Tipo de produto não encontrado.');
    }

    Object.assign(tipo, updateTipoDto);

    return await this.prismaService.tipoProduto.update({
      where: { nome },
      data: tipo,
    });
  }

  async create(createTipoDto: CreateTipoProdutoDto) {
    const tipo = await this.findByNome(createTipoDto.nome);

    if (tipo) {
      throw new ConflictException('Nome de tipo já existe.');
    }

    return await this.prismaService.tipoProduto.create({ data: createTipoDto });
  }

  async delete(nome: string): Promise<boolean> {
    const tipo = await this.findByNome(nome);

    if (!tipo) {
      throw new NotFoundException('Tipo de produto não encontrado.');
    }

    await this.update(nome, { ativo: false });
    return true;
  }
}
