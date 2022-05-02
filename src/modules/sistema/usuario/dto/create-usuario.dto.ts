import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
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
  readonly username?: string;

  @ApiProperty({ example: 'exemplo@email.com' })
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  readonly senha: string;
}
