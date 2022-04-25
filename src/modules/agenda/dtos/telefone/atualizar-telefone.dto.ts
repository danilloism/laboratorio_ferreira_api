import { PartialType } from '@nestjs/mapped-types';
import { CriarTelefoneDto } from './criar-telefone.dto';

export class AtualizarTelefoneDto extends PartialType(CriarTelefoneDto) {}
