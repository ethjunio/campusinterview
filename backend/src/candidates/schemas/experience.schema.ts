import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class ExperiencePosition {
  @Prop({ required: true }) title!: string;
  @Prop({ required: true }) employer!: string;
  @Prop({ required: true }) jobTypeId!: number;
  @Prop({ required: true }) startDate!: string;
  @Prop({ required: true }) endDate!: string;
  @Prop() description?: string;
}

export const ExperiencePositionSchema = SchemaFactory.createForClass(ExperiencePosition);
