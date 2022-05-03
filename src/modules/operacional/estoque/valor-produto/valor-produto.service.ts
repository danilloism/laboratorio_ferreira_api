import { Injectable } from '@nestjs/common';
import { CreateValorProdutoDto } from './dto/create-valor-produto.dto';
import { UpdateValorProdutoDto } from './dto/update-valor-produto.dto';

@Injectable()
export class ValorProdutoService {
  create(createValorProdutoDto: CreateValorProdutoDto) {
    return 'This action adds a new valorProduto';
  }

  findAll() {
    return `This action returns all valorProduto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} valorProduto`;
  }

  update(id: number, updateValorProdutoDto: UpdateValorProdutoDto) {
    return `This action updates a #${id} valorProduto`;
  }

  remove(id: number) {
    return `This action removes a #${id} valorProduto`;
  }
}
