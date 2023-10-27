import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, SchemaTypes } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ unique: true, type: String, required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Subscription' }] })
  subscriptions: ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
