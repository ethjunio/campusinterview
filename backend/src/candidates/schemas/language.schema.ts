import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class LanguagePosition {
  @Prop({ required: true }) languageCode!: string;
  @Prop({ required: true }) languageLevelId!: number;
  @Prop() qualification!: string;
}

export const LanguagePositionSchema = SchemaFactory.createForClass(LanguagePosition);
