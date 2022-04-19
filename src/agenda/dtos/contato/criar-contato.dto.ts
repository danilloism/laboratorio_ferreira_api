import { Dto } from 'src/shared/dtos/dto';
import { CriarTelefoneDto } from '../../dtos/telefone/telefone.dto';
import { CriarUsuarioDto } from '../usuario/criar-usuario.dto';
import { IsBoolean, IsNotEmptyObject, IsString } from 'class-validator';
import { CategoriaContato } from 'src/agenda/enums/categoria-contato.enum';

export class CriarContatoDto implements Dto {
  @IsString()
  readonly nome: string;

  @IsString()
  readonly categoria: CategoriaContato;

  @IsBoolean()
  readonly usaEspOdont: boolean;

  @IsNotEmptyObject({ nullable: false })
  readonly telefones: CriarTelefoneDto[];

  @IsNotEmptyObject({ nullable: true })
  readonly usuario: CriarUsuarioDto;
}
