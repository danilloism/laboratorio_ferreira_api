import { Module } from '@nestjs/common';
import { ProdutoService } from './services/produto.service';
import { ProdutoController } from './controllers/produto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { TipoProduto } from './entities/tipo-produto.entity';
import { ValorProduto } from './entities/valor-produto.entity';
import { MarcaProduto } from './entities/marca-produto.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Produto,
      TipoProduto,
      ValorProduto,
      MarcaProduto,
    ]),
  ],
  controllers: [ProdutoController],
  providers: [ProdutoService],
})
export class ProdutoModule {}
