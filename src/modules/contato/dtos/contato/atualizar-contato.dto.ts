import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CriarContatoDto } from './criar-contato.dto';

export class AtualizarContatoDto {
  @ApiProperty({
    example: 'Danillo Ilggner',
    description: 'Nome do contato.',
  })
  @IsString()
  @IsNotEmpty()
  readonly nome: string;
}
