import { IsUUID } from 'class-validator';
import { CreateLancamentoBaseDto } from './create-lancamento-base.dto';

export class CreateLancamentoEntradaDto extends CreateLancamentoBaseDto {
  @IsUUID()
  readonly servicoId: string;
}
