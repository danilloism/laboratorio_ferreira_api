import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Produto } from '@prisma/client';
import { PrismaService } from '../../data/services/prisma.service';

import { CreateProdutoDto } from '../dtos/create-produto.dto';
import { UpdateProdutoDto } from '../dtos/update-produto.dto';

@Injectable()
export class ProdutoService {
  constructor(private readonly prismaService: PrismaService) {}

  private readonly include = Prisma.validator<Prisma.ProdutoArgs>()({
    include: {
      valores: {
        select: { espOdont: true, valorEmCents: true },
        where: { ativo: true },
        orderBy: { ativo: 'desc' },
      },
    },
  });

  async findById(uid: string) {
    return this.prismaService.produto.findUnique({
      where: { uid },
      ...this.include,
    });
  }

  async create(dto: CreateProdutoDto) {
    const jaExiste = await this.produtoExiste(dto, 'create');
    if (jaExiste) throw new ConflictException('Produto já existe.');

    const { valorCliente, valorEspOdont, marca, tipo, nome, descricao } = dto;

    return await this.prismaService.produto.create({
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
  }

  async findAll() {
    return this.prismaService.produto.findMany({
      ...this.include,
    });
  }

  async getHistoricoValores(
    produtoUid: string,
    espOdont?: boolean,
    cliente?: boolean,
    take?: number,
    skip?: number,
  ) {
    const produto = await this.findById(produtoUid);
    if (!produto) {
      throw new NotFoundException('Produto não encontrado.');
    }

    return await this.prismaService.valorProduto.findMany({
      where: {
        produtoUid,
        espOdont:
          (espOdont && cliente) || (!espOdont && !espOdont)
            ? undefined
            : cliente != true,
      },
      orderBy: this.include.include.valores.orderBy,
      take: Number.isNaN(take) ? undefined : take,
      skip: Number.isNaN(skip) ? undefined : skip,
    });
  }

  async update(uid: string, dto: UpdateProdutoDto) {
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

    return await this.prismaService.produto.update({
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
  }

  async remove(uid: string) {
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
  ) {
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
