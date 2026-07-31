import { User } from '@/users/schemas/user.schema';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export class CompanyRepresentant {
  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: true,
    unique: true,
  })
  userId!: Types.ObjectId;

  @Prop() fullName!: string;
  @Prop() position!: string;
  @Prop() attending!: boolean;
  // @Prop() attendanceSlot?: any;
  @Prop() areDailyNotificationsEnabled!: boolean;
}

export const CompanyRepresentantSchema =
  SchemaFactory.createForClass(CompanyRepresentant);
