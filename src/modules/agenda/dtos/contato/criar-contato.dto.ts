import { ApiProperty } from '@nestjs/swagger';
import { Contato, Telefone, Usuario } from '@prisma/client';
import { IsNotEmpty, IsObject, isObject, IsString } from 'class-validator';
import { CriarTelefoneDto } from '../telefone/criar-telefone.dto';
// export interface CriarContatoDto {//   readonly contato: Contato;//   readonly telefones: Telefone[];// }
export class CriarContatoDto {
  @ApiProperty({ example: 'Danillo Ilggner' })
  @IsNotEmpty()
  @IsString()
  readonly nome: string;

  @ApiProperty({
    isArray: true,
    type: [CriarTelefoneDto],
    example: [{ ddd: 62, numero: 995305195, whatsapp: true }],
  })
  @IsNotEmpty({ each: true })
  @IsObject({ each: true })
  readonly telefones: Telefone[];
}
