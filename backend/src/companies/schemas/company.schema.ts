import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

import { DropdownOption } from '@/common/types';
import { User } from '@/users/schemas/user.schema';
import { ContactPerson, ContactPersonSchema } from './contact.schema';
import {
  CompanyRepresentant,
  CompanyRepresentantSchema,
} from './representant.schema';

export enum CompanyOnboardingState {
  General = 'general',
  Contact = 'contact',
  FactsAndFigres = 'facts',
  WhyJoinUs = 'joinus',
  Representants = 'participants',
  Finished = 'finished',
}

@Schema()
export class Company {
  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: true,
    unique: true,
  })
  userId!: Types.ObjectId;

  @Prop({
    type: String,
    enum: CompanyOnboardingState,
    default: CompanyOnboardingState.General,
  })
  onboardingState!: CompanyOnboardingState;

  // General Data
  @Prop() name?: string;
  @Prop() description?: string;
  @Prop() website?: string;
  @Prop() industries?: number[];

  // Facts and figures
  @Prop() corporateActivity?: string;
  @Prop() headquarterLocation?: string;
  @Prop() philosophy?: string;
  @Prop() shareOfGraduates?: number;
  @Prop() swissEmployeeCount?: number;
  @Prop() swissOfficeLocation?: string;
  @Prop() worldEmployeeCount?: number;

  // Why join us?
  @Prop() culture?: string;
  @Prop() fieldsOfStudy?: DropdownOption[];
  @Prop() lookingFor?: string;
  @Prop() mainLanguage?: string;
  @Prop() offeredPositionTypes?: DropdownOption[];
  @Prop() startingSalary?: string;
  @Prop() weOffer?: string;

  @Prop([ContactPersonSchema]) contacts?: ContactPerson[];

  @Prop([CompanyRepresentantSchema]) representants?: CompanyRepresentant[];
}

export const CompanySchema = SchemaFactory.createForClass(Company);

export type CompanyDocument = HydratedDocument<Company>;
