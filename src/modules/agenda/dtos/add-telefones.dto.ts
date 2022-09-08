import { Transform } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsPhoneNumber,
} from 'class-validator';
import { TelefoneHelper } from '../helpers/telefone.helper';

export class AdicionarTelefonesDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @IsPhoneNumber('BR', { each: true })
  @Transform(({ value }) =>
    value.map((telefone: string) => TelefoneHelper.format(telefone)),
  )
  public readonly telefones: string[];
}
