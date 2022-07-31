import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import * as currency from 'currency.js';
import { CurrencyHelper } from 'src/modules/common/helpers/currency.helper';
import { StringHelper } from '../../common/helpers/string.helper';

export class CreateProdutoDto {
  @IsString()
  @IsNotEmpty()
  readonly nome: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => StringHelper.capitalize(value.toLowerCase()))
  readonly marca?: string;

  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  readonly tipo: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  readonly descricao?: string;

  @IsNotEmpty()
  @ApiProperty({
    type: 'integer',
    description:
      'Valor cobrado por dentistas do próprio Espaço Odontológico (em centavos).',
  })
  @Transform(({ value }) => CurrencyHelper.createCurrencyInstance(value))
  readonly valorEspOdont: currency;

  @IsNotEmpty()
  @ApiProperty({
    type: 'integer',
    description:
      'Valor cobrado de dentistas clientes do Laboratório (em centavos).',
  })
  @Transform(({ value }) => CurrencyHelper.createCurrencyInstance(value))
  readonly valorCliente: currency;
}
