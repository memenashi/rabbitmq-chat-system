import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';
import { MessageType } from '../dto/message.resource';

export type MessageDocument = Document & Message;

@Schema()
export class Message {
  @Prop({ required: true })
  content: string;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'User' })  // Userを参照
  userId: ObjectId;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: () => 'message' })
  type: MessageType;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
