import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class SkillPosition {
  @Prop({ required: true }) itSkillId!: number;
  @Prop({ required: true }) skillLevelId!: number;
  @Prop() description!: string;
}

export const SkillPositionSchema = SchemaFactory.createForClass(SkillPosition);
