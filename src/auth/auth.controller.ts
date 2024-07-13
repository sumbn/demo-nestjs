import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/user/entities/user.entity';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto): Promise<User> {
    console.log(registerUserDto);
    return this.authService.register(registerUserDto);
  }

  @Post('login')
  @ApiResponse({ status: 201, description: 'login success' })
  @ApiResponse({ status: 401, description: 'login fail' })
  @UsePipes(ValidationPipe)
  login(@Body() loginUserDto: LoginUserDto): Promise<any> {
    return this.authService.login(loginUserDto);
  }

  @Post('refresh-token')
  refreshToken(@Body() { refresh_token }): Promise<any> {
    return this.authService.refreshToken(refresh_token);
  }
}
