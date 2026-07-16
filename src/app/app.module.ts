import { Module } from "@nestjs/common";
import { AuthModule } from "../modules/auth/auth.module";
import { DatabaseModule } from "src/database/database.module";

@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
