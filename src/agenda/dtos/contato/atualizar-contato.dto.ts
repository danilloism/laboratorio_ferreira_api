import { PartialType } from '@nestjs/mapped-types';
import { CriarContatoDto } from './criar-contato.dto';

export class AtualizarContatoDto extends PartialType(CriarContatoDto) {}
