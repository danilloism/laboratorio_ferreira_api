import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Produto } from '@prisma/client';
import { PrismaService } from '../../data/services/prisma.service';

import { CreateProdutoDto } from '../dtos/create-produto.dto';
import { UpdateProdutoDto } from '../dtos/update-produto.dto';
import { ProdutoEntity } from '../entities/produto.entity';
import { ValorProdutoEntity } from '../entities/valor-produto.entity';

@Injectable()
export class ProdutoService {
  constructor(private readonly prismaService: PrismaService) {}

  private readonly include = Prisma.validator<Prisma.ProdutoArgs>()({
    include: { valores: { where: { ativo: true } } },
  });

  async findById(uid: string): Promise<ProdutoEntity | undefined> {
    const produto = await this.prismaService.produto.findUnique({
      where: { uid },
      ...this.include,
    });

    return ProdutoEntity.fromPrisma(produto);
  }

  async create(dto: CreateProdutoDto): Promise<ProdutoEntity> {
    const jaExiste = await this.produtoExiste(dto, 'create');
    if (jaExiste) throw new ConflictException('Produto já existe.');

    const { valorCliente, valorEspOdont, marca, tipo, nome, descricao } = dto;

    const produto = await this.prismaService.produto.create({
      data: {
        nome: nome,
        descricao: descricao,
        marcaProduto: marca
          ? {
              connectOrCreate: {
                where: { nome: marca },
                create: { nome: marca },
              },
            }
          : undefined,
        tipoProduto: {
          connectOrCreate: {
            where: { nome: tipo },
            create: { nome: tipo },
          },
        },
        valores: {
          createMany: {
            data: [
              {
                espOdont: true,
                valorEmCents: valorEspOdont.intValue,
              },
              {
                espOdont: false,
                valorEmCents: valorCliente.intValue,
              },
            ],
          },
        },
      },
      ...this.include,
    });

    return ProdutoEntity.fromPrisma(produto);
  }

  async findAll(): Promise<ProdutoEntity[]> {
    const produtos = await this.prismaService.produto.findMany({
      ...this.include,
    });

    return produtos.map(produto => ProdutoEntity.fromPrisma(produto));
  }

  async getHistoricoValores(
    produtoUid: string,
    espOdont?: boolean,
    cliente?: boolean,
    take?: number,
    skip?: number,
  ): Promise<ValorProdutoEntity[]> {
    const produto = await this.findById(produtoUid);
    if (!produto) {
      throw new NotFoundException('Produto não encontrado.');
    }

    return await this.prismaService.valorProduto.findMany({
      where: {
        produtoUid,
        espOdont:
          (espOdont && cliente) || (!espOdont && !cliente)
            ? undefined
            : cliente != true,
      },
      orderBy: [{ ativo: 'desc' }, { dtFim: 'desc' }],
      take: Number.isNaN(take) ? undefined : take,
      skip: Number.isNaN(skip) ? undefined : skip,
    });
  }

  async update(uid: string, dto: UpdateProdutoDto): Promise<ProdutoEntity> {
    const jaExiste = await this.produtoExiste(dto, 'update', uid);
    if (jaExiste) throw new ConflictException('Produto já existe.');

    const { valorCliente, valorEspOdont, marca, tipo, nome, descricao, ativo } =
      dto;

    type valorInput = { espOdont: boolean; valorEmCents: number };
    const inputValorEspOdont: valorInput = {
      espOdont: true,
      valorEmCents: valorEspOdont?.intValue,
    };
    const inputValorCliente: valorInput = {
      espOdont: false,
      valorEmCents: valorCliente?.intValue,
    };

    const produto = await this.prismaService.produto.update({
      where: { uid },
      data: {
        nome: nome != null ? nome : undefined,
        descricao,
        ativo: ativo != null ? ativo : undefined,
        marcaProduto:
          marca != null
            ? {
                connectOrCreate: {
                  where: { nome: marca },
                  create: { nome: marca },
                },
              }
            : undefined,
        tipoProduto:
          tipo != null
            ? {
                connectOrCreate: {
                  where: { nome: tipo },
                  create: { nome: tipo },
                },
              }
            : undefined,
        valores:
          valorCliente || valorEspOdont
            ? {
                updateMany: {
                  where: {
                    ativo: true,
                    espOdont:
                      valorEspOdont && valorCliente ? undefined : !valorCliente,
                  },
                  data: {
                    ativo: false,
                    dtFim: new Date(),
                  },
                },
                createMany: {
                  data:
                    valorCliente && valorEspOdont
                      ? [inputValorEspOdont, inputValorCliente]
                      : valorCliente
                      ? [inputValorCliente]
                      : [inputValorEspOdont],
                },
              }
            : undefined,
      },
      ...this.include,
    });

    return ProdutoEntity.fromPrisma(produto);
  }

  async remove(uid: string): Promise<boolean> {
    const produto = await this.findById(uid);
    if (!produto) {
      throw new NotFoundException('Produto não encontrado.');
    }

    await this.prismaService.produto.update({
      where: { uid },
      data: { ativo: false },
    });

    return true;
  }

  private async produtoExiste(
    dto: UpdateProdutoDto | CreateProdutoDto,
    metodo: 'create' | 'update',
    uid?: string,
  ): Promise<boolean> {
    const { nome, marca, tipo } = dto;
    let produto: Produto;
    if (metodo == 'create') {
      produto = await this.prismaService.produto.findFirst({
        where: {
          nome,
          marca: marca || null,
          tipo,
        },
      });

      return !!produto;
    }

    if (!uid) {
      throw new Error(
        'Uid do produto deve ser fornecido se o método é update.',
      );
    }

    produto = await this.prismaService.produto.findUnique({ where: { uid } });

    if (!produto) throw new NotFoundException('Produto não encontrado.');

    const constraint = await this.prismaService.produto.findFirst({
      where: {
        nome: nome ?? produto.nome,
        marca: marca ?? produto.marca,
        tipo: tipo ?? produto.tipo,
        NOT: { uid },
      },
    });

    return !!constraint;
  }
}
