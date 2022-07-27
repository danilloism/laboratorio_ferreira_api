import { RoleEnum } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { CreateTelefoneDto } from './create-telefone.dto';
import { CreateUsuarioDto } from './create-usuario.dto';

export class CreateContatoDto {
  @IsNotEmpty()
  @MaxLength(80)
  public readonly nome: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayUnique()
  @IsEnum(RoleEnum, { each: true })
  public readonly categorias: RoleEnum[];

  @ValidateNested({ each: true })
  @Type(() => CreateTelefoneDto)
  public readonly telefones: CreateTelefoneDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateUsuarioDto)
  public readonly usuario?: CreateUsuarioDto;
}
