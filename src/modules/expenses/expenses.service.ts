import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";
import { PrismaService } from "src/database/prisma/prisma.service";

@Injectable()
export class ExpensesService {
  constructor(private db: PrismaService) {}

  async createUserExpense(createExpenseDto: CreateExpenseDto) {
    const { userId, category, description, amount } = createExpenseDto;

    const user = await this.db.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException(
        "User is not registered, Please register first",
      );
    }

    try {
      await this.db.expense.create({
        data: {
          userId,
          category,
          description: description ?? "",
          amount,
        },
      });
    } catch (error) {
      console.error("Error creating expense:", error);
      throw new UnauthorizedException("Error creating expense");
    }
  }

  async findAllExpensesUser(id: number) {
    try {
      const user_expenses = await this.db.expense.findMany({
        where: {
          userId: id,
        },
        select: {
          id: true,
          category: true,
          description: true,
          amount: true,
        },
      });
      const sum_amount = await this.db.expense.aggregate({
        where: {
          userId: id,
        },
        _sum: {
          amount: true,
        },
      });
      return {
        gastos: user_expenses,
        totalGastos: sum_amount._sum.amount ?? 0,
      };
    } catch (error) {
      console.error("Error fetching expenses:", error);
      throw new UnauthorizedException("Error fetching expenses");
    }
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
