import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsUUID } from 'class-validator';
import currency from 'currency.js';
import { CurrencyHelper } from 'src/modules/common/helpers/currency.helper';

export class CreateItemServicoDto {
  @IsInt()
  @IsOptional()
  readonly quantidade?: number;

  @IsInt()
  @IsOptional()
  @Transform(({ value }) => CurrencyHelper.createCurrencyInstance(value))
  readonly desconto?: currency;

  @IsInt()
  @IsOptional()
  @Transform(({ value }) => CurrencyHelper.createCurrencyInstance(value))
  readonly multa?: currency;

  @IsUUID()
  readonly produtoId?: string;
}
