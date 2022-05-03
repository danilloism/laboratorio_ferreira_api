import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TipoProduto } from '../enum/tipo-produto.enum';

export class CreateProdutoDto {
  @IsString()
  readonly nome: string;

  @IsOptional()
  @IsString()
  readonly marca?: string;

  @IsEnum(TipoProduto)
  readonly tipo: TipoProduto;

  @IsOptional()
  @IsString()
  readonly descricao?: string;
}
