import { neon, NeonQueryFunction } from "@neondatabase/serverless";
import { Global, Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Global()
@Injectable()
export class DatabaseService implements OnModuleInit {
  public sql!: NeonQueryFunction<false, false>;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const databaseUrl = this.configService.get<string>("DATABASE_URL");
    if (!databaseUrl) {
      throw new Error("DATABASE_URL não configurada");
    }
    this.sql = neon(databaseUrl);
  }
}
