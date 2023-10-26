import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './schemas/message.schema';
import { User } from 'src/user/schemas/user.schema';
import { MessageResource, MessageType } from './dto/message.resource';
import {
  Subscription,
  SubscriptionDocument,
} from '../user/schemas/subscription.schema';
import * as webpush from 'web-push';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    @InjectModel(Subscription.name)
    private subscriptionModel: Model<SubscriptionDocument>,
  ) {}

  async create(
    content: string,
    userId: string,
    type: MessageType,
  ): Promise<MessageResource> {
    const newMessage = new this.messageModel({ content, userId, type });
    return (await newMessage.save())
      .populate<{ userId: User }>('userId')
      .then((message) => ({
        content: message.content,
        createdAt: message.createdAt,
        type: message.type,
        user: {
          username: message.userId.username,
          email: message.userId.email,
        },
      }));
  }

  async findBeforeLastMessage(
    lastMessageId?: string,
    limit = 50,
  ): Promise<MessageResource[]> {
    return this.getMessages(lastMessageId) // 最後のメッセージIDより前のメッセージを検索
      .populate<{ userId: User }>('userId') // Userを参照
      .limit(limit)
      .exec()
      .then((messages) =>
        messages.map((message) => ({
          content: message.content,
          createdAt: message.createdAt,
          type: message.type,
          user: {
            username: message.userId.username,
            email: message.userId.email,
          },
        })),
      );
  }

  getMessages(lastMessageId?: string) {
    if (lastMessageId) {
      return this.messageModel.find({ _id: { $lt: lastMessageId } });
    }
    return this.messageModel.find().sort({ _id: -1 });
  }

  async sendNotification(message: MessageResource) {
    const subscriptions = await this.subscriptionModel.find();
    const payload = JSON.stringify({
      title: 'New Message',
      body: message.content,
    });

    subscriptions.forEach((sub) => {
      webpush.sendNotification(sub, payload);
    });
  }
}
