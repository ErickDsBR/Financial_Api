import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterCredentials {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @MinLength(2)
  @MaxLength(100)
  @IsNotEmpty()
  name!: string;

  @IsString()
  @MinLength(6)
  @MaxLength(100)
  @IsNotEmpty()
  password!: string;

  @IsString()
  @MinLength(6)
  @MaxLength(100)
  @IsNotEmpty()
  confirmPassword!: string;
}

export class LoginCredentials {
  @IsEmail()
  @IsNotEmpty({
    message: 'Email is required',
  })
  email!: string;

  @IsString()
  @MinLength(6)
  @MaxLength(100)
  @IsNotEmpty({
    message: 'Password is required',
  })
  password!: string;
}
