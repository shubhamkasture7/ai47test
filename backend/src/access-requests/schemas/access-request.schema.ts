import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AccessRequestDocument = HydratedDocument<AccessRequest>;

export type RequestStatus = 'pending' | 'approved' | 'rejected';

@Schema({ timestamps: true })
export class AccessRequest {
  @Prop({ required: true, index: true })
  userId!: string; // Clerk user ID

  @Prop({ required: true })
  userEmail!: string;

  @Prop({ required: true })
  userName!: string;

  @Prop({ required: true })
  telegramChatId!: string;

  @Prop({ required: true, maxlength: 500 })
  reason!: string;

  @Prop({ required: true, default: 'London' })
  location!: string;

  @Prop({
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
    index: true,
  })
  status!: RequestStatus;

  @Prop({ type: String })
  reviewedBy?: string; // Admin's Clerk ID

  @Prop({ type: Date })
  reviewedAt?: Date;
}

export const AccessRequestSchema = SchemaFactory.createForClass(AccessRequest);

// Compound index for common query patterns
AccessRequestSchema.index({ userId: 1, status: 1 });
