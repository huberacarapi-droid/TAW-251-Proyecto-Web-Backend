import { IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength, } from 'class-validator';
import { UserRole } from '../entities/users.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  nombre!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  paterno!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  materno!: string;

  @IsEmail()
  @MaxLength(100)
  email!: string;

  @IsEnum(UserRole)
  rol?: UserRole;

  @IsString()
  @MinLength(8)
  @MaxLength(100)
  password!: string;
}

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  nombre?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  paterno?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  materno?: string;

  @IsEmail()
  @MaxLength(100)
  email?: string;

  @IsEnum(UserRole)
  rol?: UserRole; 

  @IsString()
  @MinLength(8)
  @MaxLength(100)
  password?: string;
}