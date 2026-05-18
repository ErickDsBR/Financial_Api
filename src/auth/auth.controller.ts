import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginCredentials, RegisterCredentials } from './dto/user.dtos';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  register(@Body() credentials: RegisterCredentials) {
    return this.authService.register(credentials);
  }
  @Post('/login')
  login(@Body() credentials: LoginCredentials) {
    return this.authService.login(credentials);
  }
}
