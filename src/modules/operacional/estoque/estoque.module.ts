import { Module } from '@nestjs/common';
import { ProdutoModule } from './produto/produto.module';
import { ValorProdutoModule } from './valor-produto/valor-produto.module';

@Module({
  imports: [ProdutoModule, ValorProdutoModule]
})
export class EstoqueModule {}
