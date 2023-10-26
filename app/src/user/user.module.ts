import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/auth/auth.module';
import {
  Subscription,
  SubscriptionSchema,
} from './schemas/subscription.schema';

@Module({
  imports: [
    PassportModule,
    AuthModule,
    JwtModule.register({
      secret: 'YOUR_SECRET_KEY',
      signOptions: { expiresIn: '60m' },
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Subscription.name, schema: SubscriptionSchema },
    ]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
