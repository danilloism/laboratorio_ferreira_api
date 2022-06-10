import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
  ClassSerializerInterceptor,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { ProdutoService } from '../services/produto.service';
import { CreateProdutoDto } from '../dtos/create-produto.dto';
import { UpdateProdutoDto } from '../dtos/update-produto.dto';
import { ApiTags } from '@nestjs/swagger';
import { ResultDto } from 'src/modules/common/dtos/result.dto';

@ApiTags('Produtos')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  async create(@Body() createProdutoDto: CreateProdutoDto) {
    return await this.produtoService.create(createProdutoDto);
  }

  @Get()
  async findAll() {
    return await this.produtoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
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

  @Get(':id/valores')
  async getHistoricoValores(
    @Param('id') id: string,
    @Query('filtro') filtro: ('espOdont' | 'cliente')[],
  ) {
    if (
      filtro.length == 0 ||
      (filtro.includes('espOdont') && filtro.includes('cliente'))
    ) {
      return await this.produtoService.getHistoricoValores(id);
    }

    if (filtro.includes('espOdont')) {
      return await this.produtoService.getHistoricoValores(id, true);
    }

    return await this.produtoService.getHistoricoValores(id, undefined, true);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProdutoDto: UpdateProdutoDto,
  ) {
    return await this.produtoService.update(id, updateProdutoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.produtoService.remove(id);
  }
}
