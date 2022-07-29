import { ConflictException } from '@nestjs/common';

export class TelefoneHelper {
  static readonly format = (telefone: string): string => {
    telefone = telefone.replace(/[^0-9]/g, '');
    if (telefone.length != 11) {
      throw new ConflictException('Telefone inválido.');
    }
    return telefone;
  };
}
