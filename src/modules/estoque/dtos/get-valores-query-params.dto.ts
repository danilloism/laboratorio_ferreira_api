import { Transform, Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { ItemFiltroValoresEnum } from '../enums/item-filtro-valores.enum';

export class GetValoresQueryParamsDto {
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(2)
  @ArrayMinSize(1)
  @ArrayUnique()
  @Type(() => String)
  @Transform(({ value }) => value.split(','))
  @IsEnum(ItemFiltroValoresEnum, { each: true })
  public readonly filtro?: ItemFiltroValoresEnum[];
}
