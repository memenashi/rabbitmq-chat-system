import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { SubscribeRequest } from './dto/subscribe.request';
import {
  Subscription,
  SubscriptionDocument,
} from './schemas/subscription.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Subscription.name)
    private subscriptionModel: Model<SubscriptionDocument>,
  ) {}

  async create(
    username: string,
    password: string,
    email: string,
  ): Promise<User> {
    const user = new this.userModel({
      username,
      password,
      email,
    });
    return user.save();
  }

  async findUserByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username });
  }

  async subscribe(
    userId: string,
    request: SubscribeRequest,
  ): Promise<Subscription> {
    const user = await this.userModel.findById(userId);
    const subscription = await this.subscriptionModel.create({
      userId: user._id,
      ...request,
    });
    await subscription.save();
    user.subscriptions.push(subscription._id);
    await user.save();
    return subscription;
  }
}
