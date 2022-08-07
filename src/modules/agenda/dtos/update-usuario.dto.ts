import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateAccountDto } from './create-account.dto';

export class UpdateUsuarioDto extends PartialType(
  OmitType(CreateAccountDto, ['senha'] as const),
) {}
