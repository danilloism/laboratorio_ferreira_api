import { IsBoolean, IsNumber, IsPhoneNumber } from 'class-validator';

export class CriarTelefoneDto {
  @IsPhoneNumber('BR')
  readonly numero: number;

  @IsBoolean()
  readonly whatsapp?: boolean;

  @IsNumber({ maxDecimalPlaces: 0, allowInfinity: false })
  readonly ddd?: number;
}
