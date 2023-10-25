import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody, ApiTags, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/user-request.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  @ApiBody({ type: CreateUserDto, description: 'User Registration' })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.userService.create(
      createUserDto.username,
      createUserDto.password,
      createUserDto.email,
    );
    return {
      username: user.username,
      email: user.email,
    };
  }

  @Post('login')
  @ApiBody({ type: LoginDto, description: 'User Login' })
  @ApiResponse({ status: 200, description: 'User successfully logged in' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.authService.login(user);
  }
}
