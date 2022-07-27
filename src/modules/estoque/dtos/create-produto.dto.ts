import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import currency from 'currency.js';
import { CurrencyHelper } from 'src/modules/common/helpers/currency.helper';
import { StringHelper } from '../../common/helpers/string.helper';

export class CreateProdutoDto {
  @IsNotEmpty()
  readonly nome: string;

  @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => StringHelper.capitalize(value.toLowerCase()))
  readonly marca?: string;

  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  readonly tipo: string;

  @IsOptional()
  @IsNotEmpty()
  readonly descricao?: string;

  @IsInt()
  @Transform(({ value }) => CurrencyHelper.createCurrencyInstance(value))
  readonly valorEspOdont: currency;

  @IsInt()
  @Transform(({ value }) => CurrencyHelper.createCurrencyInstance(value))
  readonly valorCliente: currency;
}
