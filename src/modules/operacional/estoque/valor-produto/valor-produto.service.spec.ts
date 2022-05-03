import { Test, TestingModule } from '@nestjs/testing';
import { ValorProdutoService } from './valor-produto.service';

describe('ValorProdutoService', () => {
  let service: ValorProdutoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValorProdutoService],
    }).compile();

    service = module.get<ValorProdutoService>(ValorProdutoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
