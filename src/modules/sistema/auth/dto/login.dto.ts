import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class LoginDto {
  @IsOptional()
  username?: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  senha: string;
}
