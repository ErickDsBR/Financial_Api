import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ExpensesService } from "./expenses.service";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";

@Controller("expenses")
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post("/addExpense")
  async create(@Body() createExpenseDto: CreateExpenseDto) {
    return await this.expensesService.createUserExpense(createExpenseDto);
  }

  @Get()
  findAll() {
    return this.expensesService.findAllExpensesUser();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.expensesService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expensesService.update(+id, updateExpenseDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.expensesService.remove(+id);
  }
}
