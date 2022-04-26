import { Test, TestingModule } from '@nestjs/testing';
import { ContatoService } from '../service/contato.service';
import { ContatoController } from './contato.controller';

describe('ContatoController', () => {
  let controller: ContatoController;
  const mockService = {
    get: jest.fn(),
    getById: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    findTelefones: jest.fn(),
    findUsuario: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContatoController],
      providers: [ContatoService],
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
