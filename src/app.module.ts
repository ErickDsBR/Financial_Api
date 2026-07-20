import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth/auth.module";
import { DatabaseModule } from "./database/database.module";
import { ConfigModule } from "@nestjs/config";
import { ExpensesModule } from "./modules/expenses/expenses.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config: Record<string, unknown>) => {
        if (!config.DATABASE_URL) {
          throw new Error("DATABASE_URL é obrigatória");
        }
        return config;
      },
    }),
    AuthModule,
    ExpensesModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
