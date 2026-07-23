import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";
import { DatabaseService } from "../../database/database.service";

@Injectable()
export class ExpensesService {
  constructor(private db: DatabaseService) {}
  async createUserExpense(createExpenseDto: CreateExpenseDto) {
    const { userId, category, description, amount } = createExpenseDto;

    if (!userId) {
      throw new Error("E Necessario estar logado para criar uma despesa");
    }

    try {
      const [expense] = await this.db.sql`
          INSERT INTO "Expense" ("userId", "category", "description", "amount")
          VALUES (${userId}, ${category}, ${description}, ${amount})
          RETURNING *
        `;
      return expense;
    } catch (error) {
      throw new UnauthorizedException({
        message: "Error creating expense",
        suggestion: "Please check your input and try again.",
        internalCode: "EXPENSE_001",
      });
    }
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
