import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";
export class CreateExpenseDto {
  //! testando fks!!

  @IsNotEmpty()
  @IsInt()
  userId!: number;

  @IsString()
  category!: string;

  @IsString()
  description!: string;

  @IsNumber()
  amount!: number;
}
