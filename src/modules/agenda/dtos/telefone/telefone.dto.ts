import { IsBoolean, IsNumber, IsPhoneNumber } from 'class-validator';
import { Dto } from 'src/shared/dtos/dto';

export class CriarTelefoneDto implements Dto {
  @IsPhoneNumber('BR')
  readonly numero: number;

  @IsBoolean()
  readonly whatsapp?: boolean;

  @IsNumber({ maxDecimalPlaces: 0, allowInfinity: false })
  readonly ddd?: number;
}
