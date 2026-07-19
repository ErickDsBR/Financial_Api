import { Module } from "@nestjs/common";
import { AuthModule } from "../modules/auth/auth.module";
import { DatabaseModule } from "../database/database.module";
import { ConfigModule } from "@nestjs/config";

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
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
