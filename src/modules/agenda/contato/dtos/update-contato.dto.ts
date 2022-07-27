import { OmitType, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateContatoDto } from './create-contato.dto';

export class UpdateContatoDto extends PartialType(
  OmitType(CreateContatoDto, ['usuario', 'telefones'] as const),
) {
  @IsBoolean()
  @IsOptional()
  readonly ativo?: boolean;
}
