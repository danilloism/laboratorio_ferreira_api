import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

import {
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUsuarioDto {
  @IsUUID()
  @IsOptional()
  readonly contatoId: string;

  @ApiProperty({ example: 'nomeusuario' })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.toLowerCase())
  readonly username?: string;

  @ApiProperty({ example: 'exemplo@email.com' })
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  readonly email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  readonly senha: string;
}
