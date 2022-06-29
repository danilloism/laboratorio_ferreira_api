import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../data/services/prisma.service';

import { CreateProdutoDto } from '../dtos/create-produto.dto';
import { UpdateProdutoDto } from '../dtos/update-produto.dto';

@Injectable()
export class ProdutoService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {
  }

  private readonly include: Prisma.ProdutoInclude = {
    tipoProduto: true,
    marcaProduto: true,
    historicoValores: {
      take: 10,
      orderBy: {
        ativo: 'desc',
        dtFim: 'desc',
      },
    },
  };

  async findById(uid: string) {
    return this.prismaService.produto.findUnique({
      where: { uid },
      include: this.include,
    });
  }

  async create({
    valorCliente,
    valorEspOdont,
    marca,
    tipo,
    nome,
    descricao,
  }: CreateProdutoDto) {
    return this.prismaService.produto.create({
      data: {
        nome: nome,
        descricao: descricao,
        marcaProduto: {
          connectOrCreate: {
            where: { nome: marca },
            create: { nome: marca },
          },
        },
        tipoProduto: {
          connectOrCreate: {
            where: { nome: tipo },
            create: { nome: tipo },
          },
        },
        historicoValores: {
          createMany: {
            data: [
              {
                espOdont: true,
                valorEmCents: valorEspOdont.cents(),
              },
              {
                espOdont: false,
                valorEmCents: valorCliente.cents(),
              },
            ],
          },
        },
      },
      include: {
        ...this.include,
        historicoValores: true,
      },
    });
  }

  async findAll() {
    return this.prismaService.produto.findMany({
      include: this.include,
    });
  }

  async getHistoricoValores(produtoUid: string, espOdont?: boolean, cliente?: boolean) {
    const produto = await this.findById(produtoUid);
    if (!produto) {
      throw new NotFoundException('Produto não encontrado.');
    }

    return await this.prismaService.valorProduto.findMany({
      where: {
        produtoUid,
        espOdont: (espOdont && cliente) || (!espOdont && !espOdont) ? undefined : cliente != true,
      },
      orderBy: this.include['historicoValores']['orderBy'],
    });
  }

  async update(uid: string, {
    valorCliente,
    valorEspOdont,
    marca,
    tipo,
    nome,
    descricao,
    ativo,
  }: UpdateProdutoDto) {
    const produto = await this.findById(uid);

    if (!produto) {
      throw new NotFoundException('Produto não encontrado.');
    }

    const constraint = await this.prismaService.produto.findFirst({
      where: {
        nome,
        marca: marca ?? produto.marca ?? null,
        tipo,
        NOT: { uid },
      },
    });

    if (constraint) {
      throw new ConflictException(
        'Produto com nome, marca e tipo informados já existe.',
      );
    }

    type valorInput = { espOdont: boolean, valorEmCents: number }
    const inputValorEspOdont: valorInput = {
      espOdont: true,
      valorEmCents: valorEspOdont.cents(),
    };
    const inputValorCliente: valorInput = {
      espOdont: false,
      valorEmCents: valorCliente.cents(),
    };

    return await this.prismaService.produto.update({
      where: { uid },
      data: {
        nome: nome != null ? nome : undefined,
        descricao,
        ativo: ativo != null ? ativo : undefined,
        marcaProduto: marca != null ? {
          connectOrCreate: {
            where: { nome: marca },
            create: { nome: marca },
          },
        } : undefined,
        tipoProduto: tipo != null ? {
          connectOrCreate: {
            where: { nome: tipo },
            create: { nome: tipo },
          },
        } : undefined,
        historicoValores: valorCliente || valorEspOdont ? {
          updateMany: {
            where: {
              ativo: true,
              espOdont: valorEspOdont && valorCliente ? undefined : !valorCliente,
            },
            data: {
              ativo: false,
              dtFim: new Date(),
            },
          },
          createMany: {
            data: valorCliente && valorEspOdont ? [
              inputValorEspOdont,
              inputValorCliente,
            ] : valorCliente ? [ inputValorCliente ] : [ inputValorEspOdont ],
          },
        } : undefined,
      },
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
}
