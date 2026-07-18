import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import { DatabaseService } from "../../database/database.service";

@Injectable()
export class AuthService {
  constructor(private db: DatabaseService) {}

  async create(createAuthDto: CreateAuthDto) {
    const { name, email, password } = createAuthDto;

    try {
      const existingUser = await this.db.sql`
        SELECT *
        FROM "User"
        WHERE email = ${email}
      `;

      if (existingUser.length > 0) {
        throw new ConflictException({
          message: "Email already exists",
          suggestion:
            "Please use a different email address or log in with your existing account.",
          internalCode: "AUTH_001",
        });
      } else {
        const rows = await this.db.sql`
          INSERT INTO "User" (name, email, password) 
          VALUES (${name}, ${email}, ${password}) 
          RETURNING *
        `;
        return { message: "User created successfully", rows };
      }
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      console.error("Error critico:", error);
      throw new InternalServerErrorException("erro");
    }
  }

  async findAll() {
    try {
      const result = await this.db.sql`
        SELECT *
        FROM "User"
      `;
      return { message: "Users fetched successfully", rows: result };
    } catch (error) {
      throw new Error("Error fetching all users", { cause: error });
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
