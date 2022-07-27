import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMarcaProdutoDto {
  @IsNotEmpty()
  readonly nome: string;

  @IsOptional()
  @IsNotEmpty()
  readonly descricao?: string;
}
