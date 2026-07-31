import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class EducationDetails {
  @Prop() averageGrade?: number;
  @Prop() educationLevelId?: number;
  @Prop() endDate?: string;
  @Prop() fieldOfStudyId?: number;
  @Prop() otherMajor?: string;
  @Prop() otherSpecialization?: string;
  @Prop() otherUniversity?: string;
  @Prop() specializationId?: number;
  @Prop() startDate?: string;
  @Prop() universityId?: number;
}

export const EducationDetailsSchema =
  SchemaFactory.createForClass(EducationDetails);
