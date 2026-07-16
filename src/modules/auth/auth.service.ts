import { Injectable } from "@nestjs/common";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import { DatabaseService } from "../../database/database.service";

@Injectable()
export class AuthService {
  constructor(private db: DatabaseService) {}

  async create(createAuthDto: CreateAuthDto) {
    const { name, email, password } = createAuthDto;

    try {
      const { rows } = await this.db.client.query(
        "INSERT INTO users (name, email,password) VALUES ($1, $2, $3) RETURNING *",
        [name, email, password],
      );
      return { message: "User created successfully", rows };
    } catch (error) {
      throw new Error("Error creating auth", { cause: error });
    }
  }

  findAll() {
    return `This action returns all auth`;
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
