import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';

export class TelefoneDto {
  @ApiProperty({ description: 'Número do telefone.', example: 995305195 })
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

  @ApiProperty({
    default: 62,
    description: 'Código DDD do telefone.',
    example: 62,
    required: false,
  })
  @IsOptional()
  @IsInt()
  readonly ddd?: number;
}
