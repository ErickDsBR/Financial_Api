import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";
import { PrismaService } from "src/database/prisma/prisma.service";

@Injectable()
export class ExpensesService {
  constructor(private db: PrismaService) {}
  async createUserExpense(createExpenseDto: CreateExpenseDto) {
    const { userId, category, description, amount } = createExpenseDto;
  }

  findAllExpensesUser() {
    return `This action returns all expenses for the current user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} expense`;
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return `This action updates a #${id} expense`;
  }

  remove(id: number) {
    return `This action removes a #${id} expense`;
  }
}
