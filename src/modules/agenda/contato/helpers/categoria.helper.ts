import { Contato } from '../entities/contato.entity';
import { CategoriaEnum } from '../enums/categoria.enum';

export class CategoriaHelper {
  static readonly isDentistaEspOdont = (contato: Contato) =>
    contato.categorias.includes(CategoriaEnum.DENTISTA) &&
    contato.categorias.includes(CategoriaEnum.COLABORADOR);

  static readonly isDentistaCliente = (contato: Contato) =>
    contato.categorias.includes(CategoriaEnum.DENTISTA) &&
    contato.categorias.includes(CategoriaEnum.CLIENTE);
}
