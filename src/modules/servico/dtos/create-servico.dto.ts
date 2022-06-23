import { Optional } from '@nestjs/common';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { CreateItemServicoDto } from './create-item-servico.dto';

export class CreateServicoDto {
  @Optional()
  @IsString()
  readonly descricao?: string;

  @Optional()
  @IsString()
  readonly observacoes?: string;

  @IsUUID()
  readonly dentistaId: string;

  @IsOptional()
  @IsUUID()
  readonly pacienteId?: string;

  @IsBoolean()
  readonly espOdont: boolean;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  readonly produtos: CreateItemServicoDto[];
}
