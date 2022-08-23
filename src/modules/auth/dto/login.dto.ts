import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email?: string;

  @IsNotEmpty()
  senha: string;
}
