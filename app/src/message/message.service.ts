import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './schemas/message.schema';
import { User } from 'src/user/schemas/user.schema';
import { MessageResource, MessageType } from './dto/message.resource';
import { Subscription } from '../user/schemas/subscription.schema';
import { UserService } from 'src/user/user.service';
import { sendNotification } from 'web-push';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    private readonly userService: UserService,
  ) {}

  async create(
    content: string,
    userId: string,
    type: MessageType,
    req: any,
  ): Promise<MessageResource> {
    const newMessage = new this.messageModel({ content, userId, type });
    await newMessage.save();
    const messageResource = newMessage
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
    const subscriptions = await this.userService.findSubscriptionWithoutMe();
    const jsonStr = JSON.stringify({
      content: content,
      createdAt: new Date(),
      type: type,
      user: {
        username: req.user.username,
        email: req.user.email,
      },
    });
    subscriptions.forEach(({ keys, endpoint }) => {
      const sub = { keys, endpoint };
      try {
        console.log('send notification', sub);
        sendNotification(sub, jsonStr);
      } catch (e) {
        if (e instanceof Error) {
          console.log(e.message);
        } else {
          console.log(e);
        }
      }
    });
    return messageResource;
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

  async sendNotificationToUnPostedUser(
    subscription: Subscription,
    message: MessageResource,
  ) {
    const payload = JSON.stringify({
      title: 'New Message',
      body: message.content,
    });

    sendNotification(subscription, payload);
  }
}

function base64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
