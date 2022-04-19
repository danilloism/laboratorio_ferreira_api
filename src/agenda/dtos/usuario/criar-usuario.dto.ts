import { IsString } from 'class-validator';
import { Dto } from 'src/shared/dtos/dto';

export class CriarUsuarioDto implements Dto {
  @IsString()
  readonly username: string;

  //   @IsEmail()
  readonly email?: string;

  readonly senha?: string;
}
