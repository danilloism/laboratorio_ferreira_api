import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { HttpExceptionHelper } from 'src/shared/helpers/http-exception.helper';
import { ApiTags } from '@nestjs/swagger';
import { RoleInterceptor } from 'src/modules/sistema/shared/interceptor/role.interceptor';
import { Categoria } from 'src/modules/sistema/shared/enum/categoria.enum';

@ApiTags('Produtos')
@UseInterceptors(new RoleInterceptor(Categoria.GERENTE))
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
    const produto = await this.produtoService.getProdutoComValorAtual(id);
    if (!produto) {
      HttpExceptionHelper.throwNotFoundException();
    }

    return produto;
  }

  @Get(':id/historico-valores')
  async getHistoricoValores(@Param('id') id: string) {
    return await this.produtoService.getHistoricoValores(id);
  }

  @Get(':id/historico-valores/esp-odont')
  async getHistoricoValoresEspOdont(@Param('id') id: string) {
    return await this.produtoService.getHistoricoValoresEspOdont(id);
  }

  @Get(':id/historico-valores/dentista')
  async getHistoricoValoresDentista(@Param('id') id: string) {
    return await this.produtoService.getHistoricoValoresDentista(id);
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
