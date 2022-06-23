import { PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { CreateTipoProdutoDto } from './create-tipo-produto.dto';

export class UpdateTipoProdutoDto extends PartialType(CreateTipoProdutoDto) {
  @IsOptional()
  @IsBoolean()
  readonly ativo?: boolean;
}
