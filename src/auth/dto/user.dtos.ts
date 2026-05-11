import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterCredentials {
  @IsEmail()
  email!: string;
  @MinLength(2)
  @MaxLength(100)
  username!: string;
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  password!: string;
  @IsString()
  @MinLength(6)
  @MaxLength(10)
  confirmPassword!: string;
}

export class LoginCredentials {
  @IsEmail()
  email!: string;
  @IsString()
  @MinLength(6)
  @MaxLength(10)
  password!: string;
}
