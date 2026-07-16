import { Injectable } from "@nestjs/common";
import { Client } from "pg";

@Injectable()
export class DatabaseService {
  client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  constructor() {
    this.client.connect();
  }
}
