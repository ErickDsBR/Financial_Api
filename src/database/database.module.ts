import { Global, Module } from "@nestjs/common";
import { DatabaseService } from "./database.service";

@Global()
@Module({
  exports: [DatabaseService],
  imports: [DatabaseService],
})
export class DatabaseModule {}
