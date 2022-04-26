import { Test, TestingModule } from '@nestjs/testing';
import { v1 as uuid_v1 } from 'uuid';
import { ContatoService } from './contato.service';
import { PrismaService } from '../../sistema/prisma';
import faker from '@faker-js/faker';

describe('ContatoService', () => {
  let service: ContatoService;
  let prisma: PrismaService;
  const contatos = [
    {
      nome: faker.name.findName(),
      id: uuid_v1(),
      atualizadoEm: new Date(),
      criadoEm: new Date(),
    },
    {
      nome: faker.name.findName(),
      id: uuid_v1(),
      atualizadoEm: new Date(),
      criadoEm: new Date(),
    },
    {
      nome: faker.name.findName(),
      id: uuid_v1(),
      atualizadoEm: new Date(),
      criadoEm: new Date(),
    },
    {
      nome: faker.name.findName(),
      id: uuid_v1(),
      atualizadoEm: new Date(),
      criadoEm: new Date(),
    },
  ] as const;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContatoService, PrismaService],
    }).compile();

    prisma = module.get<PrismaService>(PrismaService);
    service = module.get<ContatoService>(ContatoService);

    prisma.contato.findUnique = jest.fn().mockReturnValue(contatos[0]);
    prisma.contato.findMany = jest.fn().mockReturnValue(contatos);
    prisma.contato.create = jest.fn().mockReturnValue(contatos[0]);
    prisma.contato.update = jest.fn().mockReturnValue(contatos[0]);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getById', () => {
    it('deve retornar um contato.', async () => {
      const contato = await service.getById('id');

      expect(contato).toMatchObject(contatos[0]);
      expect(prisma.contato.findUnique).toBeCalledTimes(1);
    });
  });

  describe('get', () => {
    it('deve retornar todos os contatos.', async () => {
      const contatos = await service.get();

      expect(contatos).toHaveLength(4);
      expect(prisma.contato.findMany).toBeCalledTimes(1);
    });
  });
});
