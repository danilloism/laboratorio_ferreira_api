import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { FinalidadeSaidaEnum } from '../enums/finalidade-saida.enum';
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
