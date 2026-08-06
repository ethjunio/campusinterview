import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class PersonalData {
  @Prop() salutation?: string;
  @Prop() firstName?: string;
  @Prop() lastName?: string;
  @Prop() phoneCountryCode?: string;
  @Prop() phoneNumber?: string;
  @Prop() dateOfBirth?: string;
  @Prop() city?: string;
  @Prop() country?: string;
  @Prop() nationality?: string;
  @Prop() residencePermit?: string;
  @Prop() experienceYears?: number;
  @Prop() imageKey?: string;
}

export const PersonalDataSchema = SchemaFactory.createForClass(PersonalData);
