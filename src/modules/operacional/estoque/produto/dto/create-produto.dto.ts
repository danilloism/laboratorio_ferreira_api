import { Transform } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { StringHelper } from '../../../../common/helpers/string.helper';

export class CreateProdutoDto {
  @IsString()
  @IsNotEmpty()
  readonly nome: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => StringHelper.capitalize(value.toLowerCase()))
  readonly marca?: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  readonly tipo: string;

  @IsOptional()
  @IsString()
  readonly descricao?: string;

  @IsInt()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @IsNotEmpty()
  readonly valorEspOdont: number;

  @IsInt()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  @IsNotEmpty()
  readonly valorDentista: number;
}
