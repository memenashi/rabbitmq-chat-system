import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';
import { Model } from 'mongoose';
import { JwtPayload } from 'src/jwt.payload';
import { LoginRequest } from 'src/user/dto/login.request';
import { User, UserDocument } from 'src/user/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (user && password != user.password) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async login({ email, password }: LoginRequest, res: Response) {
    console.log('validating user');
    const user = await this.validateUser(email, password);
    console.log('user', user);
    const payload = { username: user.username, sub: user._id }; // _idを含めることでユーザーを特定
    const token = this.jwtService.sign(payload);

    // トークンをCookieに保存するためのオプションを設定
    const cookieOptions = {
      httpOnly: true,
      // secure: true,  // HTTPSを使用している場合のみこのオプションを有効にする
      expires: new Date(Date.now() + 7 * 24 * 60 * 60), // 1週間後に有効期限切れとする例
    };
    console.log('setting cookie');
    // トークンをHTTP Only Cookieとしてセット
    res.cookie('Authentication', token, cookieOptions);
  }

  async validateUserByJwt(payload: JwtPayload): Promise<any> {
    console.log('validating user by JWT');
    // JWTペイロードからユーザー名を取得して、そのユーザーが存在するかどうかを確認
    const user = await this.userModel.findOne({ username: payload.username });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}
