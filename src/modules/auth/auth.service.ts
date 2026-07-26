import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateAuthDto, LoginAuthDto } from "./dto/create-auth.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import { PrismaService } from "../../database/prisma/prisma.service";

@Injectable()
export class AuthService {
  constructor(private db: PrismaService) {}

  async create(createAuthDto: CreateAuthDto) {
    const { name, email, password } = createAuthDto;

    const existingUser = await this.db.user.findUnique({
      where: { email },
    });

    try {
      if (existingUser) {
        throw new ConflictException("User already exists");
      }

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

    try {
      const user = await this.db.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new UnauthorizedException({
          message: "This email is not registered, Please register first",
        });
      }

      const isPasswordValid = user.password === password;

      if (!isPasswordValid) {
        throw new UnauthorizedException({
          message: "Invalid password, Please try again",
        });
      }

      return { message: "User logged in successfully", user };
    } catch (error) {}
  }

  async update(id: number, updateAuthDto: UpdateAuthDto) {
    const { name, email, password } = updateAuthDto;
  }

  async remove(id: number) {}
}
