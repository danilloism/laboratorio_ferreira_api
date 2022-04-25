import { randomUUID } from 'crypto';
import { faker } from '@faker-js/faker';
import { Contato } from '@prisma/client';

export default class TestUtil {
  static getValidContato(): Contato {
    return {
      id: randomUUID(),
      nome: faker.name.findName(),
      criadoEm: new Date(),
      atualizadoEm: new Date(),
    };
  }
}
