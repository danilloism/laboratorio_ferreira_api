import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Role } from 'src/shared/enums/role.enum';
export class CriarUsuarioDto {
  @ApiProperty()
  @IsString()
  readonly username: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly senha?: string;

  @ApiProperty({ enum: Role, isArray: true, name: 'role' })
  @IsEnum(Role, { each: true })
  readonly roles: Role[];
}
