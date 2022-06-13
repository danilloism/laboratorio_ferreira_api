import { IsInt, IsOptional, IsString } from 'class-validator';

export abstract class CreateLancamentoBaseDto {
  @IsInt()
  @IsOptional()
  readonly numParcelas?: number;

  @IsOptional()
  readonly dtPrimeiroVencimento?: Date;

  @IsOptional()
  @IsInt()
  readonly intervaloEntreParcelas?: number;

  @IsOptional()
  @IsString()
  readonly descricao?: string;

  @IsOptional()
  @IsString()
  readonly obervacoes?: string;

  @IsInt()
  readonly valor: number;
}
