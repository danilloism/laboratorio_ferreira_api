import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { Role } from '../../../../shared/enums/role.enum';
export class CriarUsuarioDto {
  @ApiProperty({ example: 'nomeusuario' })
  @IsString()
  readonly username: string;

  @ApiProperty({ example: 'exemplo@email.com' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: '*****' })
  @IsString()
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
