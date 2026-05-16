import { Injectable } from '@nestjs/common';
import { RegisterCredentials } from './dto/user.dtos';

import { User } from './Entities/user_entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {} //! inject repository into the service

  async register(credentials: RegisterCredentials) {
    const { email, name, password, confirmPassword } = credentials;

    if (password !== confirmPassword) {
      throw new Error('Password and confirm password do not match');
    }

    const userExists = await this.userRepository.findOne({ where: { email } });
    if (userExists) {
      throw new Error('User with this email already exists');
    }

    const newUser = {
      email,
      name,
      password,
    };

    this.userRepository.create(newUser);
    await this.userRepository.save(newUser);

    return {
      message: 'User registered successfully',
      user: { email, name },
    };
  }
}
