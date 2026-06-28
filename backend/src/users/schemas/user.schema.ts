import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, index: true })
  clerkId!: string;

  @Prop({ required: true, unique: true, index: true })
  email!: string;

  @Prop({ required: true })
  name!: string;

  @Prop({ type: String, enum: ['user', 'admin'], default: 'user' })
  role!: 'user' | 'admin';

  @Prop({ type: String })
  telegramChatId?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
