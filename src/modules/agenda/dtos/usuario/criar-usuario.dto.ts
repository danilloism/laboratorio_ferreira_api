import { IsString } from 'class-validator';
export class CriarUsuarioDto {
  @IsString()
  readonly username: string;

  //   @IsEmail()
  readonly email?: string;

  readonly senha?: string;
}
