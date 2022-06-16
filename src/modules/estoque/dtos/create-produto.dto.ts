import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';
import currency from 'currency.js';
import { CurrencyHelper } from 'src/modules/common/helpers/currency.helper';
import { StringHelper } from '../../common/helpers/string.helper';

export class CreateProdutoDto {
  @IsString()
  readonly nome: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => StringHelper.capitalize(value.toLowerCase()))
  readonly marca?: string;

  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  readonly tipo: string;

  @IsOptional()
  @IsString()
  readonly descricao?: string;

  @IsInt()
  @Transform(({ value }) => CurrencyHelper.createCurrencyInstance(value))
  readonly valorEspOdont: currency;

  @IsInt()
  @Transform(({ value }) => CurrencyHelper.createCurrencyInstance(value))
  readonly valorCliente: currency;

  @IsString()
  @IsOptional()
  readonly observacoes?: string;
}
