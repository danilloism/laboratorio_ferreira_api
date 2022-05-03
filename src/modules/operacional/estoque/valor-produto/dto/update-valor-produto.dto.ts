import { PartialType } from '@nestjs/swagger';
import { CreateValorProdutoDto } from './create-valor-produto.dto';

export class UpdateValorProdutoDto extends PartialType(CreateValorProdutoDto) {}
