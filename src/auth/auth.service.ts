import { ConflictException, Injectable } from '@nestjs/common';
import { LoginCredentials, RegisterCredentials } from './dto/user.dtos';

import { User } from './Entities/user_entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {} //! inject repository into the service

  async register(credentials: RegisterCredentials) {
    const { email, name, password, confirmPassword } = credentials;

    try {
      if (password !== confirmPassword) {
        throw new Error('Password and confirm password do not match');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = {
        email,
        name,
        password: hashedPassword,
      };

      const user = this.userRepository.create(newUser);
      await this.userRepository.save(user);

      return {
        message: 'User registered successfully',
        user: { email, name },
      };
    } catch (error: any) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      }

      throw error;
    }
  }

  async login(credentials: LoginCredentials) {
    const user = await this.userRepository.findOne({
      where: { email: credentials.email },
    });

    if (!user) {
      throw new Error('Invalid email or password');
    }
    const isPasswordValid = await bcrypt.compare(
      credentials.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    return {
      message: 'Login successful',
      user: { email: user.email },
    };
  }
}
