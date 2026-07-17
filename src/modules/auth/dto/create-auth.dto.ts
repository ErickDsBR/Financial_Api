import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty({ message: "O nome não pode estar vazio" })
  name!: string;

  @IsEmail({}, { message: "O email deve ser válido" })
  email!: string;

  @IsString()
  @MinLength(6, { message: "A senha deve ter no mínimo 6 caracteres" })
  password!: string;
}
