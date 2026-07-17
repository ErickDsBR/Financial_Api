import { neon } from "@neondatabase/serverless";
import { Global, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Global()
@Injectable()
export class DatabaseService {
  public readonly sql;

  constructor(private configService: ConfigService) {
    const databaseUrl = this.configService.get("DATABASE_URL");
    this.sql = neon(databaseUrl);
  }
  async getData() {
    const data = await this.sql`...`;
    return data;
  }
}
