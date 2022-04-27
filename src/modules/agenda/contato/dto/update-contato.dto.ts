import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { UpdateUsuarioDto } from '../../../sistema/usuario/dto/update-usuario.dto';

export class UpdateContatoDto {
  @ApiProperty({
    example: 'Danillo Ilggner',
    description: 'Nome do contato.',
  })
  @IsString()
  @IsNotEmpty()
  readonly nome: string;

  @ApiProperty({ type: UpdateUsuarioDto })
  @IsOptional()
  @IsObject()
  readonly usuario?: UpdateContatoDto;
}
