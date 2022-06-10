import { Transform } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { StringHelper } from '../../../common/helpers/string.helper';

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
  readonly valorEspOdont: number;

  @IsInt()
  readonly valorCliente: number;
}
