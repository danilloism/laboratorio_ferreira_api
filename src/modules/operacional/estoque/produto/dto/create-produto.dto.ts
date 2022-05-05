import {
  IsCurrency,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { TipoProduto } from '../enum/tipo-produto.enum';

export class CreateProdutoDto {
  @IsString()
  readonly nome: string;

  @IsOptional()
  @IsString()
  readonly marca?: string;

  @IsEnum(TipoProduto)
  readonly tipo: TipoProduto;

  @IsOptional()
  @IsString()
  readonly descricao?: string;

  @IsInt()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  readonly valorEspOdontEmCentavos: number;

  @IsInt()
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  readonly valorDentistaEmCentavos: number;
}
