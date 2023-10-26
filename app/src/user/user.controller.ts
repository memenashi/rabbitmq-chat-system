import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody, ApiTags, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/user.request';
import { UserResource } from './dto/user.resource';
import { LoginRequest } from './dto/login.request';
import { AuthService } from 'src/auth/auth.service';
import { LoginResource } from './dto/login.resource';

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
    type: UserResource,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async register(
    @Body() {username,password,email}: CreateUserDto,
  ): Promise<UserResource> {
    const user = await this.userService.create(
      username,
      password,
      email,
    );
    return {
      username: user.username,
      email: user.email,
    };
  }

  @Post('login')
  @ApiBody({ type: LoginRequest, description: 'User Login' })
  @ApiResponse({ status: 200, description: 'User successfully logged in', type: LoginResource })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async login(
    @Body() {username,password}:LoginRequest
  ) : Promise<LoginResource> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    const token =await this.authService.login(user);
    return {
      access_token: token.access_token,
      username: user.username,
      email: user.email,
    }
  }
}
