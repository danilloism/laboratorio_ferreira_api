import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMarcaProdutoDto {
  @IsString()
  @IsNotEmpty()
  readonly nome: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly descricao?: string;

  @IsString()
  @IsOptional()
  readonly observacoes?: string;
}
