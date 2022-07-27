import { FinalidadeSaidaEnum } from '@prisma/client';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { CreateLancamentoBaseDto } from './create-lancamento-base.dto';

export class CreateLancamentoSaidaDto extends CreateLancamentoBaseDto {
  @IsUUID()
  @IsOptional()
  readonly paraQuemId?: string;

  @IsEnum(FinalidadeSaidaEnum)
  readonly finalidadeSaida: FinalidadeSaidaEnum;

  @IsUUID()
  @IsOptional()
  readonly servicoId?: string;
}
