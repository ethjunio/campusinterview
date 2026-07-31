import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { User } from '@/users/schemas/user.schema';
import { EducationDetails, EducationDetailsSchema } from './education.schema';
import {
  ExperiencePosition,
  ExperiencePositionSchema,
} from './experience.schema';
import {
  ExtracurricularPosition,
  ExtracurricularPositionSchema,
} from './extracurricular.schema';
import { JobRequirements, JobRequirementsSchema } from './job.schema';
import { LanguagePosition, LanguagePositionSchema } from './language.schema';
import { PersonalData, PersonalDataSchema } from './personal.schema';
import { SkillPosition, SkillPositionSchema } from './skill.schema';

@Schema()
export class Candidate {
  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: true,
    unique: true,
  })
  userId!: Types.ObjectId;

  @Prop() onboardingState!: string;

  // Personal Data
  @Prop({ type: PersonalDataSchema }) personal?: PersonalData;

  // Education Details
  @Prop({ type: EducationDetailsSchema }) education?: EducationDetails;

  // Experiences
  @Prop([ExperiencePositionSchema]) experiences?: ExperiencePosition[];

  // Extracurriculars
  @Prop([ExtracurricularPositionSchema])
  extracurriculars?: ExtracurricularPosition[];

  // Skills
  @Prop([SkillPositionSchema]) skills?: SkillPosition[];

  // Languages
  @Prop([LanguagePositionSchema]) languages?: LanguagePosition[];

  // Job Requirements
  @Prop({ type: JobRequirementsSchema }) jobRequirements?: JobRequirements;
}

export const CandidateSchema = SchemaFactory.createForClass(Candidate);

// export type CandidateDocumentOverride = {
//   personal?: Types.Subdocument<Types.ObjectId> & PersonalData;
//   education?: Types.Subdocument<Types.ObjectId> & EducationDetails;
//   experiences?: Types.DocumentArray<ExperiencePosition>;
//   extracurriculars?: Types.DocumentArray<ExtracurricularPosition>;
//   skills?: Types.DocumentArray<SkillPosition>;
//   languages?: Types.DocumentArray<LanguagePosition>;
//   jobRequirements?: Types.Subdocument<Types.ObjectId> & JobRequirements;
// };

export type CandidateDocument = HydratedDocument<Candidate>;
