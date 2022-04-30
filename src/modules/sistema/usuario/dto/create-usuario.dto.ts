import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUsuarioDto {
  @ApiProperty()
  @IsUUID()
  readonly contatoId: string;

  @ApiProperty({ default: false, required: false })
  @IsBoolean()
  readonly usaEspOdont?: boolean;

  @ApiProperty({ example: 'nomeusuario', required: false })
  @IsString()
  @IsOptional()
  readonly username?: string;

  @ApiProperty({ example: 'exemplo@email.com' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: '*****' })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  readonly senha: string;
}
