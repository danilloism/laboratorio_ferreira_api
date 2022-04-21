import { Contato, Telefone, Usuario } from '@prisma/client';
import { IsNotEmpty, IsObject, isObject } from 'class-validator';
// export interface CriarContatoDto {//   readonly contato: Contato;//   readonly telefones: Telefone[];// }
export class CriarContatoDto {
  @IsNotEmpty()
  @IsObject()
  readonly contato: Omit<Contato, 'id'>;

  @IsNotEmpty({ each: true })
  @IsObject({ each: true })
  readonly telefones: Telefone[];
}
