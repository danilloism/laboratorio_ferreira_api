import { PartialType } from '@nestjs/mapped-types';
import { CriarTelefoneDto } from './telefone.dto';

export class AtualizarTelefoneDto extends PartialType(CriarTelefoneDto) {}
