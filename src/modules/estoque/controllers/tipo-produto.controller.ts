import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TipoProdutoService } from '../services/tipo-produto.service';

@ApiTags('Tipo de Produto')
@Controller('tipos-produto')
export class TipoProdutoController {
  constructor(private readonly tipoProdutoService: TipoProdutoService) {}

  @Get()
  async find() {
    return await this.tipoProdutoService.getTiposProduto();
  }
}
