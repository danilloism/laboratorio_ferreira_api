import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Role } from 'src/shared/enums/role.enum';
export class CriarUsuarioDto {
  @ApiProperty({ example: 'nomeusuario' })
  @IsString()
  readonly username: string;

  @ApiProperty({ example: 'exemplo@email.com' })
  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @ApiProperty({ example: '*****' })
  @IsOptional()
  @IsString()
  readonly senha?: string;

  @ApiProperty({
    enum: Role,
    isArray: true,
    name: 'role',
    example: [Role.USUARIO, Role.COLABORADOR],
  })
  @IsEnum(Role, { each: true })
  readonly roles: Role[];
}
