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
import { CreateUsuarioDto } from './create-usuario.dto';

export class CreateContatoDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(80)
  public readonly nome: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayUnique()
  @IsEnum(RoleEnum, { each: true })
  @IsNotEmpty()
  @ApiProperty({ enum: RoleEnum, isArray: true })
  public readonly categorias: RoleEnum[];

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @IsPhoneNumber('BR', { each: true })
  @Transform(({ value }) =>
    value.map(telefone => TelefoneHelper.format(telefone)),
  )
  public readonly telefones: string[];

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateUsuarioDto)
  public readonly usuario?: CreateUsuarioDto;
}
