import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUsuarioDto {
	@IsOptional()
	@IsString()
	@Transform(({ value }) => value.toLowerCase())
	public readonly username?: string;

	@IsEmail()
	@Transform(({ value }) => value.toLowerCase())
	public readonly email: string;

	@IsString()
	@MinLength(4)
	@MaxLength(20)
	public readonly senha: string;
}
