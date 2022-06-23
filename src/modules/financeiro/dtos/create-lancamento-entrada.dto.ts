import { IsUUID } from 'class-validator';
import { FinalidadeSaidaEnum } from '../enums/finalidade-saida.enum';
import { CreateLancamentoBaseDto } from './create-lancamento-base.dto';

export class CreateLancamentoEntradaDto extends CreateLancamentoBaseDto {
  @IsUUID()
  readonly servicoId: string;
}
