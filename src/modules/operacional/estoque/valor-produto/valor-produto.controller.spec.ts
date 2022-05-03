import { Test, TestingModule } from '@nestjs/testing';
import { ValorProdutoController } from './valor-produto.controller';
import { ValorProdutoService } from './valor-produto.service';

describe('ValorProdutoController', () => {
  let controller: ValorProdutoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ValorProdutoController],
      providers: [ValorProdutoService],
    }).compile();

    controller = module.get<ValorProdutoController>(ValorProdutoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
