import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { TelefoneHelper } from '../helpers/telefone.helper';
import { CreateAccountDto } from './create-account.dto';

export class CreateContatoDto {
  @IsNotEmpty({ message: 'Nome não pode ser vazio.' })
  @IsString()
  @MaxLength(80, { message: 'Nome deve ter no máximo 80 caracteres.' })
  public readonly nome: string;

  @IsArray()
  @ArrayMinSize(1, { message: 'Contato deve possuir pelo menos 1 categoria.' })
  @ArrayUnique()
  @IsEnum(RoleEnum, { each: true })
  @ApiProperty({ enum: RoleEnum, isArray: true })
  public readonly categorias: RoleEnum[];

  @IsArray()
  @ArrayMinSize(1, { message: 'Contato deve possuir pelo menos 1 telefone.' })
  @IsPhoneNumber('BR', {
    each: true,
    message: 'Telefone deve possuir ddd + número de 9 dígitos.',
  })
  @Transform(({ value }) =>
    value.map(telefone => TelefoneHelper.format(telefone)),
  )
  public readonly telefones: string[];

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateAccountDto)
  public readonly account?: CreateAccountDto;
}
