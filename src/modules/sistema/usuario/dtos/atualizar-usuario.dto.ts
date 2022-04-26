import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Role } from '../../../../shared/enums/role.enum';
export class AtualizarUsuarioDto {
  @ApiProperty({ examples: ['nomeusuario', 'nome_usuario', 'nomeUsuario'] })
  @IsOptional()
  @IsString()
  readonly username?: string;

  @ApiProperty({ example: 'exemplo@email.com', required: false })
  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @ApiProperty({ example: '*****', required: false })
  @IsOptional()
  @IsString()
  readonly senha?: string;

  @ApiProperty({
    enumName: 'Role',
    enum: Role,
    isArray: true,
    name: 'role',
    example: [Role.USUARIO, Role.COLABORADOR],
    uniqueItems: true,
    type: Role,
    required: false,
  })
  @IsOptional()
  @IsEnum(Role, { each: true })
  readonly roles?: Role[];
}
