import { Module } from '@nestjs/common';
import { DataModule } from '../data/data.module';
import { PrismaService } from '../data/services/prisma.service';
import { MarcaProdutoController } from './controllers/marca-produto.controller';
import { ProdutoController } from './controllers/produto.controller';
import { TipoProdutoController } from './controllers/tipo-produto.controller';
import { MarcaProdutoService } from './services/marca-produto.service';
import { ProdutoService } from './services/produto.service';
import { TipoProdutoService } from './services/tipo-produto.service';

@Module({
  imports: [DataModule],
  controllers: [
    ProdutoController,
    TipoProdutoController,
    MarcaProdutoController,
  ],
  providers: [
    PrismaService,
    ProdutoService,
    TipoProdutoService,
    MarcaProdutoService,
  ],
  exports: [ProdutoService],
})
export class EstoqueModule {}
