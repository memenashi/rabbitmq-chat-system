import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './schemas/message.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async create(content: string, userId: string): Promise<Message> {
    const newMessage = new this.messageModel({ content, userId });
    return newMessage.save();
  }

  async findBeforeLastMessage(
    lastMessageId?: string,
    limit = 50,
  ): Promise<Message[]> {
    if (lastMessageId) {
      return this.messageModel
        .find({ _id: { $lt: lastMessageId } }) // 最後のメッセージIDより前のメッセージを検索
        .limit(limit)
        .exec();
    } else {
      return this.messageModel
        .find()
        .sort({ _id: -1 }) // 最新のメッセージから取得
        .limit(limit)
        .exec();
    }
  }
}
