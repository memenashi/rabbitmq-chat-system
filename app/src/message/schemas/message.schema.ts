import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Document & Message;

@Schema()
export class Message {
  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: () => 'message' })
  type: 'message' | 'join' | 'leave' | 'direct';
}

export const MessageSchema = SchemaFactory.createForClass(Message);
