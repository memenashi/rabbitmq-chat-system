// subscription.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';

export type SubscriptionDocument = Subscription & Document;

@Schema()
export class Subscription {
  @Prop({ required: true, type: String, unique: true })
  endpoint: string;

  @Prop({ type: String, default: null })
  expirationTime: string | null;

  @Prop({ required: true, type: Object })
  keys: {
    p256dh: string;
    auth: string;
  };

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'User' })
  userId: ObjectId;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
