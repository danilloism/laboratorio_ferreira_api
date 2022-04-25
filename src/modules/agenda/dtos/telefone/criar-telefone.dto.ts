import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNumber, IsPhoneNumber } from 'class-validator';

export class CriarTelefoneDto {
  @ApiProperty()
  @IsPhoneNumber('BR')
  readonly numero: number;

  @ApiProperty()
  @IsBoolean()
  readonly whatsapp?: boolean;

  @ApiProperty({})
  @IsInt()
  readonly ddd?: number;
}
