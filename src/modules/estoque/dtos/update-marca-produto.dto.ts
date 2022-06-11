import { PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateMarcaProdutoDto } from './create-marca-produto.dto';

export class UpdateMarcaProdutoDto extends PartialType(CreateMarcaProdutoDto) {
  @IsOptional()
  @IsBoolean()
  readonly ativo?: boolean;
}
