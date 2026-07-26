import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateAuthDto, LoginAuthDto } from "./dto/create-auth.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import { DatabaseService } from "../../database/database.service";
import { PrismaService } from "../../database/prisma/prisma.service";

@Injectable()
export class AuthService {
  //* constructor(private db: DatabaseService) {}
  constructor(private db: PrismaService) {}

  async create(createAuthDto: CreateAuthDto) {
    const { name, email, password } = createAuthDto;
    try {
      const user = await this.db.user.create({
        data: {
          name,
          email,
          password,
        },
      });
      return { message: "User created successfully", user };
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

  }

  async update(id: number, updateAuthDto: UpdateAuthDto) {
    const { name, email, password } = updateAuthDto;

    
  }

  async remove(id: number) {
    
  }
}
