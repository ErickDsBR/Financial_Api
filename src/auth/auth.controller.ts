import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterCredentials } from './dto/user.dtos';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  register(@Body() credentials: RegisterCredentials) {
    return this.authService.register(credentials);
  }
}
