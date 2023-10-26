import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { ApiBody, ApiTags, ApiResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/user.request';
import { UserResource } from './dto/user.resource';
import { LoginRequest } from './dto/login.request';
import { AuthService } from 'src/auth/auth.service';
import { LoginResource } from './dto/login.resource';
import { AuthGuard } from '@nestjs/passport';

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
    @Body() { username, password, email }: CreateUserDto,
  ): Promise<UserResource> {
    const user = await this.userService.create(username, password, email);
    return {
      username: user.username,
      email: user.email,
    };
  }

  @Post('login')
  @ApiBody({ type: LoginRequest, description: 'User Login' })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in',
    type: LoginResource,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async login(@Body() LoginRequest: LoginRequest, @Res() res: Response) {
    console.log('login', LoginRequest);
    await this.authService.login(LoginRequest, res);
    console.log('login successful');
    res.send({ message: 'Login successful' });
  }

  @Get('info')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: UserResource, description: 'User Info' })
  async info(@Req() req: any): Promise<UserResource> {
    return {
      username: req.user.username,
      email: req.user.email,
    };
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ description: 'Logged Out.' })
  async logout(@Req() req: any, @Res() res: Response): Promise<void> {
    await this.authService.logout(req, res);
  }
}
