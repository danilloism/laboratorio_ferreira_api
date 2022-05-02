import { OmitType, PartialType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateUsuarioDto } from './create-usuario.dto';

export class UpdateUsuarioDto extends PartialType(
  OmitType(CreateUsuarioDto, ['senha', 'contatoId'] as const),
) {}
