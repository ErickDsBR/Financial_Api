import { Global, Module } from "@nestjs/common";
import { DatabaseService } from "./database.service";
import { PrismaModule } from "./prisma/prisma.module";

@Global()
@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
  imports: [PrismaModule],
})
export class DatabaseModule {}
