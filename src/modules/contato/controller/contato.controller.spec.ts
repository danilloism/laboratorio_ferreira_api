import { Test, TestingModule } from '@nestjs/testing';
import { ContatoController } from './contato.controller';
import { ContatoService } from '../service/contato.service';

describe('ContatoController', () => {
  let controller: ContatoController;
  const mockService = {
    get: jest.fn(),
    getById: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContatoController],
    })
      .overrideProvider(ContatoService)
      .useValue(mockService)
      .compile();

    controller = module.get<ContatoController>(ContatoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
