import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';

export class TelefoneDto {
  @ApiProperty({
    description: 'Número do telefone com DDD.',
    example: 62995305195,
  })
  @IsNotEmpty()
  @IsPhoneNumber('BR')
  readonly numero: number;

  @ApiProperty({
    description: 'Confirmação se telefone é usado para WhatsApp.',
    default: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  readonly whatsapp?: boolean;
}
