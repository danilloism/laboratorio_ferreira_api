import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ValorProdutoService } from './valor-produto.service';
import { CreateValorProdutoDto } from './dto/create-valor-produto.dto';
import { UpdateValorProdutoDto } from './dto/update-valor-produto.dto';

@Controller('valor-produto')
export class ValorProdutoController {
  constructor(private readonly valorProdutoService: ValorProdutoService) {}

  @Post()
  create(@Body() createValorProdutoDto: CreateValorProdutoDto) {
    return this.valorProdutoService.create(createValorProdutoDto);
  }

  @Get()
  findAll() {
    return this.valorProdutoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.valorProdutoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateValorProdutoDto: UpdateValorProdutoDto) {
    return this.valorProdutoService.update(+id, updateValorProdutoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.valorProdutoService.remove(+id);
  }
}
