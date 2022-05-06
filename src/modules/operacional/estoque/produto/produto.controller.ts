import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  NotImplementedException,
} from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

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
    return await this.produtoService.getProdutoComValorAtual(id);
  }

  @Get(':id/historico-valores')
  async getHistoricoValores(@Param('id') id: string) {
    return await this.produtoService.getHistoricoValores(id);
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
