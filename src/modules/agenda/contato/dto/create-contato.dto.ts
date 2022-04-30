import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { TelefoneHelper } from 'src/shared/helpers/telefone.helper';
import { CreateUsuarioDto } from '../../../sistema/usuario/dto/create-usuario.dto';
import { Categoria } from '../enum/categoria.enum';
export class CreateContatoDto {
  @ApiProperty({ example: 'Danillo Ilggner', description: 'Nome do contato.' })
  @IsString()
  readonly nome: string;

  @IsNotEmpty()
  @IsEnum(Categoria)
  categoria: Categoria;

  @ApiProperty({
    example: '62123456789',
  })
  @Length(11, 11, {
    message:
      'Tamanho da propriedade <telefone> deve ser exatamente 11 com DDD ocupando 2 espaços e o número ocupando os 9 restantes. ',
  })
  @IsNotEmpty({ message: 'Propriedade <telefone> deve conter algum valor.' })
  @IsPhoneNumber('BR', {
    message:
      'Propriedade <telefone> inválida. Modelo válido: <ddd><numero>. Exemplo: 62123456789. Consulte a documentação para mais detalhes.',
  })
  @Transform(({ value }) => TelefoneHelper.format(value.toString()))
  telefone?: string | number;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateUsuarioDto)
  readonly usuario?: CreateUsuarioDto;
}
