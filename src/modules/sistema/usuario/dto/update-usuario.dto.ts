import { OmitType, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateUsuarioDto } from './create-usuario.dto';

export class UpdateUsuarioDto extends PartialType(
  OmitType(CreateUsuarioDto, ['senha', 'contatoId'] as const),
) {
  @IsOptional()
  @IsBoolean()
  readonly ativo?: boolean;
}
