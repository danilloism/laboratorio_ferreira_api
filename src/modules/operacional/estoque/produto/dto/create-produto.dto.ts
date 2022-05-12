import { Transform } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { StringHelper } from 'src/shared/helpers/string.helper';

export class CreateProdutoDto {
  @IsString()
  readonly nome: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => StringHelper.capitalize(value.toLowerCase()))
  readonly marca?: string;

  @IsString()
  @Transform(({ value }) => StringHelper.capitalize(value.toLowerCase()))
  readonly tipo: string;

  @IsOptional()
  @IsString()
  readonly descricao?: string;

  @IsInt()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  readonly valorEspOdont: number;

  @IsInt()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  readonly valorDentista: number;

  @IsOptional()
  @IsString({ each: true })
  readonly etapasFabricacao: string[];
}
