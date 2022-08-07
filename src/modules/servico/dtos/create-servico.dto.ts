import { Optional } from '@nestjs/common';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsOptional,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { CreateItemServicoDto } from './create-item-servico.dto';

export class CreateServicoDto {
  @Optional()
  readonly descricao?: string;

  @Optional()
  readonly observacoes?: string;

  @IsUUID()
  readonly dentistaUid: string;

  @IsOptional()
  @IsUUID(undefined, { each: true })
  @IsArray()
  @ArrayNotEmpty()
  readonly uidPacientes?: string[];

  @IsBoolean()
  readonly espOdont: boolean;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateItemServicoDto)
  readonly itens: CreateItemServicoDto[];
}
