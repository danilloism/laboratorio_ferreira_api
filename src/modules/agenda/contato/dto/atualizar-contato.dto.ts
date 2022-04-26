import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { AtualizarUsuarioDto } from '../../../sistema/usuario/dtos/atualizar-usuario.dto';

export class AtualizarContatoDto {
  @ApiProperty({
    example: 'Danillo Ilggner',
    description: 'Nome do contato.',
  })
  @IsString()
  @IsNotEmpty()
  readonly nome: string;

  @ApiProperty({ type: AtualizarUsuarioDto })
  @IsOptional()
  @IsObject()
  readonly usuario?: AtualizarContatoDto;
}
