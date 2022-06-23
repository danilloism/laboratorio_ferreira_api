import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';
import currency from 'currency.js';
import { CurrencyHelper } from 'src/modules/common/helpers/currency.helper';

export abstract class CreateLancamentoBaseDto {
  @IsInt()
  @IsOptional()
  readonly numParcelas?: number;

  @IsOptional()
  readonly dtPrimeiroVencimento?: Date;

  @IsInt()
  @IsOptional()
  @Transform(({ value }) => CurrencyHelper.createCurrencyInstance(value))
  valorEntrada?: currency;

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
  @Transform(({ value }) => CurrencyHelper.createCurrencyInstance(value))
  readonly valor: currency;
}
