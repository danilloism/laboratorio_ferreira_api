import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { CriarUsuarioDto } from 'src/modules/sistema/usuario/criar-usuario.dto';
import { TelefoneDto } from '../telefone/telefone.dto';
export class CriarContatoDto {
  @ApiProperty({ example: 'Danillo Ilggner', description: 'Nome do contato.' })
  @IsString()
  readonly nome: string;

  @ApiProperty({
    isArray: true,
    type: [TelefoneDto],
    example: [{ ddd: 62, numero: 995305195, whatsapp: true }],
    description: 'Lista de telefones do contato.',
  })
  @IsNotEmpty({ each: true })
  @IsObject({ each: true })
  readonly telefones: TelefoneDto[];

  @ApiProperty({ type: CriarUsuarioDto })
  @IsOptional()
  @IsObject()
  readonly usuario: CriarUsuarioDto;
}
