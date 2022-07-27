import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTipoProdutoDto {
  @IsNotEmpty()
  readonly nome: string;

  @IsOptional()
  @IsNotEmpty()
  readonly descricao?: string;
}
