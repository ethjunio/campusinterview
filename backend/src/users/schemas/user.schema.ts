import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { WithId } from '@/database/types';

export type UserDocument = HydratedDocument<User>;

export type PublicUser = Omit<WithId<User>, 'passwordHash'>;

export enum UserType {
  Candidate = 'candidate',
  Company = 'company',
}

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  email!: string;

  @Prop({ required: true })
  passwordHash!: string;

  @Prop({ enum: UserType, required: true })
  type!: UserType;

  @Prop({ default: false, required: true })
  emailVerified!: boolean;

  @Prop()
  emailVerificationToken?: string;

  @Prop()
  emailVerificationExpires?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
