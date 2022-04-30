import { PartialType, PickType } from '@nestjs/swagger';
import { CreateContatoDto } from './create-contato.dto';

export class UpdateContatoDto extends PartialType(
  PickType(CreateContatoDto, ['nome', 'categoria', 'telefone'] as const),
) {}
