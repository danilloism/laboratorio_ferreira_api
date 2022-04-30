import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from '../enums/role.enum';

export class CreateUsuarioDto {
  @ApiProperty()
  @IsUUID()
  readonly contatoId: string;

  @ApiProperty({ default: false, required: false })
  @IsBoolean()
  readonly usaEspOdont?: boolean;

  @ApiProperty({ example: 'nomeusuario', required: false })
  @IsString()
  readonly username?: string;

  @ApiProperty({ example: 'exemplo@email.com' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: '*****' })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  readonly senha: string;

  @ApiProperty({
    enumName: 'Role',
    enum: Role,
    name: 'role',
    example: Role.USUARIO,
    type: Role,
  })
  @IsEnum(Role)
  @IsNotEmpty()
  readonly role: Role;
}
