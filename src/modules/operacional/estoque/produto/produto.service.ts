import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

    console.log(data);
    console.log(valores);

    await this.prisma.produto
      .create({
        data: { ...data, historicoValores: { create: valores } },
      })
      .catch(err => {
        throw new HttpException(
          { onde: 'Criar produto', erro: err },
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  async getProdutoComValorAtual(id: string) {
    const produto = await this.prisma.produto.findUnique({ where: { id } });
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

    for (let produto of produtos) {
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

  async update(id: string, updateProdutoDto: UpdateProdutoDto) {
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

  remove(id: number) {
    throw new Error('Não implementado');
  }
}
