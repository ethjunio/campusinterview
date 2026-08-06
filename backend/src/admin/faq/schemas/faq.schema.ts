import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum FaqType {
  Company = 'company',
  Candidate = 'candidate',
}

@Schema({ timestamps: true })
export class Faq {
  @Prop({ required: true, maxlength: 300 }) question!: string;
  @Prop({ required: true, maxlength: 2000 }) answer!: string;

  @Prop({ type: String, enum: FaqType, required: true }) type!: FaqType;
}

export const FaqSchema = SchemaFactory.createForClass(Faq);

export type FaqDocument = HydratedDocument<Faq>;
