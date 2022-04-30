import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Role } from '../enums/role.enum';
import { CreateUsuarioDto } from './create-usuario.dto';
export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {}
