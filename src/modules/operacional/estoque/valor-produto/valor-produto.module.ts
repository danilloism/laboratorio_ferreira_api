import { Module } from '@nestjs/common';
import { ValorProdutoService } from './valor-produto.service';
import { ValorProdutoController } from './valor-produto.controller';

@Module({
  controllers: [ValorProdutoController],
  providers: [ValorProdutoService]
})
export class ValorProdutoModule {}
