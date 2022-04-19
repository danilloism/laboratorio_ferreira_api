import { Dto } from 'src/modules/shared/dtos/dto';
import { CriarTelefoneDto } from '../../dtos/telefone/telefone.dto';
import { CriarUsuarioDto } from '../usuario/criar-usuario.dto';
import { IsBoolean, IsNotEmptyObject, IsString } from 'class-validator';

export class CriarContatoDto implements Dto {
  @IsString()
  readonly nome: string;

  @IsString()
  readonly categoria: string;

  @IsBoolean()
  readonly usaEspOdont: boolean;

  @IsNotEmptyObject({ nullable: false })
  readonly telefones: CriarTelefoneDto[];

  @IsNotEmptyObject({ nullable: true })
  readonly usuario: CriarUsuarioDto;
}
