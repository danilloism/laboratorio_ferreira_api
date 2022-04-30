import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateUsuarioDto } from '../../../sistema/usuario/dto/create-usuario.dto';
import { TelefoneDto } from '../../telefone/dto/telefone.dto';
import { Categoria } from '../enum/categoria.enum';
export class CreateContatoDto {
  @ApiProperty({ example: 'Danillo Ilggner', description: 'Nome do contato.' })
  @IsString()
  readonly nome: string;

  @ApiProperty({
    isArray: true,
    type: [TelefoneDto],
    example: [
      { numero: '62995305195', whatsapp: true },
      { numero: '62994645264', whatsapp: true },
    ],
    description: 'Lista de telefones do contato.',
  })
  @IsNotEmpty({ each: true })
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => TelefoneDto)
  readonly telefones: TelefoneDto[];

  @ApiProperty({ type: CreateUsuarioDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateUsuarioDto)
  readonly usuario?: CreateUsuarioDto;

  categoria: Categoria;
}
