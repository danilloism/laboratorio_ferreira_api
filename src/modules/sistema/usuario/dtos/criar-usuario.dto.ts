import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from '../../../../shared/enums/role.enum';

export class CriarUsuarioDto {
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
    isArray: true,
    name: 'role',
    example: [Role.USUARIO, Role.COLABORADOR],
    uniqueItems: true,
    type: Role,
    minimum: 1,
  })
  @IsEnum(Role, { each: true })
  readonly roles: Role[];
}
