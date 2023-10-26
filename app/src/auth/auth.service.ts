import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userModel.findOne({ username });
    if (user && password != user.password) {
      throw new UnauthorizedException();
    }
    return user;    
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user._id }; // _idを含めることでユーザーを特定
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
