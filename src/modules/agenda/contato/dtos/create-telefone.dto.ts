import { IsBoolean, IsInt, IsOptional } from 'class-validator';
import { ValidarDDDTelefone } from '../decorators/validar-ddd-telefone.decorator';
import { ValidarNumeroTelefone } from '../decorators/validar-numero-telefone.decorator';

export class CreateTelefoneDto {

  @IsInt()
  @ValidarDDDTelefone()
  public readonly ddd: number;

  @IsInt()
  @ValidarNumeroTelefone()
  public readonly numero: number;

  @IsBoolean()
  @IsOptional()
  public readonly whatsapp?: boolean;
}
