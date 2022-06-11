import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { CategoriaEnum } from '../enums/categoria.enum';
import { TelefoneHelper } from '../helpers/telefone.helper';
import { CreateAccountDto } from './create-account.dto';

export class CreateContatoDto {
  @IsString()
  @ApiProperty({ example: 'Danillo Silva' })
  readonly nome: string;

  @ArrayMinSize(1)
  @ArrayMaxSize(7)
  @ArrayUnique()
  @IsEnum(CategoriaEnum, { each: true })
  readonly categorias: CategoriaEnum[];

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
  @Transform(({ value }) => TelefoneHelper.format(value))
  readonly telefone: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateAccountDto)
  readonly account?: CreateAccountDto;
}
