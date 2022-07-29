import { Contato } from '@prisma/client';

export class ContatoHelper {
  static serialize = (contato: Contato) => {
    return {
      ...contato,
      telefones: contato.telefones.map(telefone => telefone.toString()),
    };
  };
}
