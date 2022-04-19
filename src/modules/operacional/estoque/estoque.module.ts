import { Module } from '@nestjs/common';

import { ProdutoController } from './controllers/produto/produto.controller';

import { ProdutoService } from './services/produto/produto.service';

@Module({
  controllers: [ProdutoController],
  providers: [ProdutoService],
})
export class EstoqueModule {}
