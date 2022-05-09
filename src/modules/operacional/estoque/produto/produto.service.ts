import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Produto } from '@prisma/client';
import { HttpExceptionHelper } from 'src/shared/helpers/http-exception.helper';
import { PrismaService } from '../../../sistema/prisma/prisma.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { CreateProdutoDtoHelper } from './helper/create-produto-dto.helper';

@Injectable()
export class ProdutoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProdutoDto: CreateProdutoDto) {
    const { data, valores } =
      CreateProdutoDtoHelper.normalize(createProdutoDto);

    const existeProduto = await this.prisma.produto.findUnique({
      where: { nome_tipo: { nome: data.nome, tipo: data.tipo } },
    });

    if (existeProduto) {
      HttpExceptionHelper.throwConflictException(
        'Erro ao criar produto.',
        'Produto com nome e tipo informados já existe.',
      );
    }

    const produto = await this.prisma.produto
      .create({
        data: { ...data, historicoValores: { create: valores } },
      })
      .catch(() => {
        HttpExceptionHelper.throwInternalServerException(
          'Erro ao criar pedido.',
          'Erro desconhecido.',
        );
      });

    if (!produto) {
      HttpExceptionHelper.throwInternalServerException();
    }

    return await this.getProdutoComValorAtual((produto as Produto).id);
  }

  async getProdutoComValorAtual(id: string) {
    const produto = await this.prisma.produto.findUnique({ where: { id } });

    if (!produto) {
      return;
    }
    const valores = await this.prisma.valorProduto.findMany({
      where: { produtoId: produto.id, dtFim: null },
    });

    const valorEspOdont = valores[0].espOdont
      ? valores[0].valorEmCentavos
      : valores[1].valorEmCentavos;
    const valorDentista = valores[0].espOdont
      ? valores[1].valorEmCentavos
      : valores[0].valorEmCentavos;

    Object.assign(produto, {
      valorEspOdont: valorEspOdont,
      valorDentista: valorDentista,
    });

    return produto;
  }

  async findAll() {
    const produtos = await this.prisma.produto.findMany();

    for (const produto of produtos) {
      const valores = await this.prisma.valorProduto.findMany({
        where: { produtoId: produto.id, dtFim: null },
      });
      const valorEspOdont = valores[0].espOdont
        ? valores[0].valorEmCentavos
        : valores[1].valorEmCentavos;
      const valorDentista = valores[0].espOdont
        ? valores[1].valorEmCentavos
        : valores[0].valorEmCentavos;

      Object.assign(produto, {
        valorEspOdont: valorEspOdont,
        valorDentista: valorDentista,
      });
    }

    return produtos;
  }

  async getHistoricoValores(id: string) {
    const produto = await this.prisma.produto.findUnique({ where: { id } });
    if (!produto) {
      HttpExceptionHelper.throwNotFoundException();
    }

    return await this.prisma.valorProduto.findMany({
      where: { produtoId: id },
    });
  }

  async getHistoricoValoresDentista(id: string) {
    const produto = await this.prisma.produto.findUnique({ where: { id } });
    if (!produto) {
      HttpExceptionHelper.throwNotFoundException();
    }

    return await this.prisma.valorProduto.findMany({
      where: { produtoId: id, espOdont: false },
    });
  }

  async getHistoricoValoresEspOdont(id: string) {
    const produto = await this.prisma.produto.findUnique({ where: { id } });
    if (!produto) {
      HttpExceptionHelper.throwNotFoundException();
    }

    return await this.prisma.valorProduto.findMany({
      where: { produtoId: id, espOdont: true },
    });
  }

  async update(id: string, updateProdutoDto: UpdateProdutoDto) {
    const existeProduto = await this.prisma.produto.findUnique({
      where: { id },
    });

    if (!existeProduto) {
      HttpExceptionHelper.throwNotFoundException();
    }

    const { valorDentista, valorEspOdont } = updateProdutoDto;

    const valores = {
      dentista: valorDentista
        ? {
            produtoId: id,
            espOdont: false,
            valorEmCentavos: valorDentista,
          }
        : undefined,
      espOdont: valorEspOdont
        ? {
            produtoId: id,
            espOdont: true,
            valorEmCentavos: valorEspOdont,
          }
        : undefined,
    };

    const valoresAtuais = await this.prisma.valorProduto.findMany({
      where: { produtoId: id, dtFim: null },
    });
    const idValorEspOdontAtual = valoresAtuais?.find(
      valor => valor.espOdont,
    ).id;
    const idValorDentistaAtual = valoresAtuais?.find(
      valor => !valor.espOdont,
    ).id;

    if (valorDentista && valorEspOdont) {
      await this.prisma.$transaction([
        this.prisma.valorProduto.updateMany({
          where: { produtoId: id, dtFim: { equals: null } },
          data: { dtFim: new Date() },
        }),
        this.prisma.valorProduto.createMany({
          data: [valores.dentista, valores.espOdont],
        }),
        this.prisma.produto.update({
          where: { id },
          data: {
            marca: updateProdutoDto.marca,
            nome: updateProdutoDto.nome,
            descricao: updateProdutoDto.descricao,
            tipo: updateProdutoDto.tipo,
          },
        }),
      ]);

      return await this.getProdutoComValorAtual(id);
    }

    if (!valorDentista && !valorEspOdont) {
      this.prisma.produto.update({
        where: { id },
        data: {
          marca: updateProdutoDto.marca,
          nome: updateProdutoDto.nome,
          descricao: updateProdutoDto.descricao,
          tipo: updateProdutoDto.tipo,
        },
      });

      return await this.getProdutoComValorAtual(id);
    }

    if (valorDentista) {
      await this.prisma.$transaction([
        this.prisma.valorProduto.update({
          where: { id: idValorDentistaAtual },
          data: { dtFim: new Date() },
        }),
        this.prisma.valorProduto.create({ data: valores.dentista }),
        this.prisma.produto.update({
          where: { id },
          data: {
            marca: updateProdutoDto.marca,
            nome: updateProdutoDto.nome,
            descricao: updateProdutoDto.descricao,
            tipo: updateProdutoDto.tipo,
          },
        }),
      ]);

      return await this.getProdutoComValorAtual(id);
    }

    await this.prisma.$transaction([
      this.prisma.valorProduto.update({
        where: { id: idValorEspOdontAtual },
        data: { dtFim: new Date() },
      }),
      this.prisma.valorProduto.create({ data: valores.espOdont }),
      this.prisma.produto.update({
        where: { id },
        data: {
          marca: updateProdutoDto.marca,
          nome: updateProdutoDto.nome,
          descricao: updateProdutoDto.descricao,
          tipo: updateProdutoDto.tipo,
        },
      }),
    ]);

    return await this.getProdutoComValorAtual(id);
  }

  remove(id: string) {
    throw new Error('Não implementado');
  }
}
