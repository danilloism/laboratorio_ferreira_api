import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ValorProduto } from '@prisma/client';
import { NotFoundResultDto, ResultDto } from '../../common/dtos/result.dto';
import { CreateProdutoDto } from '../dtos/create-produto.dto';
import { GetValoresQueryParamsDto } from '../dtos/get-valores-query-params.dto';
import { UpdateProdutoDto } from '../dtos/update-produto.dto';
import { ProdutoEntity } from '../entities/produto.entity';
import { ValorProdutoEntity } from '../entities/valor-produto.entity';
import { ItemFiltroValoresEnum } from '../enums/item-filtro-valores.enum';
import { ProdutoService } from '../services/produto.service';

@ApiTags('Produtos')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  async create(@Body() createProdutoDto: CreateProdutoDto) {
    return await this.produtoService.create(createProdutoDto);
  }

  @ApiOkResponse({ type: [ProdutoEntity] })
  @Get()
  async findAll() {
    return await this.produtoService.findAll();
  }

  @ApiNotFoundResponse({ type: NotFoundResultDto })
  @ApiOkResponse({ type: ProdutoEntity })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const produto = await this.produtoService.findById(id);
    if (!produto) {
      const result = new ResultDto({
        sucesso: false,
        mensagem: 'Erro ao procurar por produto.',
        erro: 'Produto não encontrado.',
      });

      throw new NotFoundException(result);
    }

    return produto;
  }

  @ApiNotFoundResponse({ type: NotFoundResultDto })
  @ApiOkResponse({ type: [ValorProdutoEntity] })
  @Get(':id/valores')
  async getHistoricoValores(
    @Param('id', ParseUUIDPipe) id: string,
    @Query() query: GetValoresQueryParamsDto,
  ): Promise<ValorProduto[]> {
    const { filtro } = query;

    if (
      !filtro ||
      (filtro.includes(ItemFiltroValoresEnum.espOdont) &&
        filtro.includes(ItemFiltroValoresEnum.cliente))
    ) {
      return await this.produtoService.getHistoricoValores(id);
    }

    if (filtro.includes(ItemFiltroValoresEnum.espOdont)) {
      return await this.produtoService.getHistoricoValores(id, true);
    }

    return await this.produtoService.getHistoricoValores(id, undefined, true);
  }

  @ApiNotFoundResponse({ type: NotFoundResultDto })
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProdutoDto: UpdateProdutoDto,
  ) {
    return await this.produtoService.update(id, updateProdutoDto);
  }

  @ApiNotFoundResponse({ type: NotFoundResultDto })
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.produtoService.remove(id);
  }
}
