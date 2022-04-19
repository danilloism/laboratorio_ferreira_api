import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoController } from './controllers/produto/produto.controller';
import { Produto } from './entities/produto.entity';
import { ValorProduto } from './entities/valor-produto.entity';
import { ProdutoService } from './services/produto/produto.service';

@Module({
  imports: [TypeOrmModule.forFeature([Produto, ValorProduto])],
  controllers: [ProdutoController],
  providers: [ProdutoService],
})
export class EstoqueModule {}
