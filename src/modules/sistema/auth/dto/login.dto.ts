import { ApiProperty } from '@nestjs/swagger';

export interface LoginDto {
  username?: string;
  email: string;
  senha: string;
}
