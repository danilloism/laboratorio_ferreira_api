export class TelefoneHelper {
  static readonly format = (telefone: string) =>
    telefone.replace(/[^0-9]/g, '');
}
