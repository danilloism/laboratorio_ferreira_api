import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import * as currency from 'currency.js';
import { CurrencyHelper } from 'src/modules/common/helpers/currency.helper';

export class CreateItemServicoDto {
  @IsOptional()
  readonly quantidade?: number;

  @IsOptional()
  @Transform(({ value }) => CurrencyHelper.createCurrencyInstance(value))
  @Type(() => currency)
  readonly desconto?: currency;

  @IsNotEmpty()
  @IsUUID()
  readonly produtoUid: string;
}
