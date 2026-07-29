import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class ExtracurricularPosition {
  @Prop({ required: true }) title!: string;
  @Prop({ required: true }) activity!: string;
  @Prop({ required: true }) startDate!: string;
  @Prop() endDate!: string;
  @Prop() description!: string;
}

export const ExtracurricularPositionSchema = SchemaFactory.createForClass(ExtracurricularPosition);
