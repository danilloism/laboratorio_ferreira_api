import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MarcaProdutoService } from '../services/marca-produto.service';
import { TipoProdutoService } from '../services/tipo-produto.service';

@ApiTags('Marca do Produto')
@Controller('marcas-produto')
export class MarcaProdutoController {
  constructor(private readonly marcaProdutoService: MarcaProdutoService) {}

  @Get()
  async find() {
    return await this.marcaProdutoService.find();
  }
}
