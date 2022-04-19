// import { Test, TestingModule } from '@nestjs/testing';
// import TestUtil from '../../../shared/utils/test.util';
// import { ContatoService } from './contato.service';

// describe('ContatoService', () => {
//   let service: ContatoService;
//   // let validContato: Contato;

//   const mockRepo = {
//     find: jest.fn(),
//     findOne: jest.fn(),
//     save: jest.fn(),
//     update: jest.fn(),
//     delete: jest.fn(),
//   };

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         ContatoService,
//         // { provide: getRepositoryToken(Contato), useValue: mockRepo },
//       ],
//     }).compile();

//     mockRepo.find.mockReset();
//     mockRepo.findOne.mockReset();

//     service = module.get<ContatoService>(ContatoService);
//     validContato = TestUtil.getValidContato();
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   describe('getById', () => {
//     it('deve retornar um contato.', async () => {
//       mockRepo.findOne.mockReturnValue(validContato);
//       const contato = await service.getById(validContato.id);

//       expect(contato).toMatchObject(validContato);
//       expect(mockRepo.findOne).toBeCalledTimes(1);
//     });
//   });

//   describe('get', () => {
//     it('deve retornar todos os contatos.', async () => {
//       mockRepo.find.mockReturnValue([validContato, validContato, validContato]);
//       const contatos = await service.get();

//       expect(contatos).toHaveLength(3);
//       expect(mockRepo.find).toBeCalledTimes(1);
//     });
//   });
// });
