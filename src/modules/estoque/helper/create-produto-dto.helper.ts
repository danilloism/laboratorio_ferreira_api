import { CreateProdutoDto } from '../dtos/create-produto.dto';

export class CreateProdutoDtoHelper {
  static normalize(createProdutoDto: CreateProdutoDto) {
    return {
      data: {
        nome: createProdutoDto.nome,
        marca: createProdutoDto.marca,
        tipo: createProdutoDto.tipo,
      },
      valores: [
        {
          espOdont: true,
          valorEmCentavos: createProdutoDto.valorEspOdont,
        },
        {
          espOdont: false,
          valorEmCentavos: createProdutoDto.valorCliente,
        },
      ],
    };
  }
}
