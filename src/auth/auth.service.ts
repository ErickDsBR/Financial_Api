import { Injectable } from '@nestjs/common';
import { RegisterCredentials } from './dto/user.dtos';

const conta: Array<{ email: string; username: string; password: string }> = [];

@Injectable()
export class AuthService {
  register(credentials: RegisterCredentials) {
    const { email, username, password, confirmPassword } = credentials;

    if (password !== confirmPassword) {
      throw new Error('Password and confirm password do not match');
    }

    const userExists = conta.find((user) => user.email === email);
    if (userExists) {
      throw new Error('User with this email already exists');
    }

    const newUser = {
      email,
      username,
      password,
    };

    conta.push(newUser);
    console.log('Registered users:', conta);
    return { message: 'User registered successfully' };
  }
}
