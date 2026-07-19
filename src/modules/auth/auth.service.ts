import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { CreateAuthDto, LoginAuthDto } from "./dto/create-auth.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import { DatabaseService } from "../../database/database.service";
import { UnauthorizedException } from "@nestjs/common";

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

  async login(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;

    try {
      const [user] = await this.db.sql`
      select * from "User" 
      where email = ${email} 
      `;
      if (!user) {
        throw new UnauthorizedException({
          message: "User not found",
          suggestion: "Please check your email and password.",
          internalCode: "AUTH_002",
        });
      } else if (user.password !== password) {
        throw new UnauthorizedException({
          message: "Invalid password",
          suggestion: "Please check your email and password.",
          internalCode: "AUTH_003",
        });
      }
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      console.error("Error critico:", error);
      throw new InternalServerErrorException("erro");
    }
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
