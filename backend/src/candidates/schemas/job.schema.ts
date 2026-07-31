import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class JobRequirements {
  @Prop() desiredJobTypeId?: string;
  @Prop() startDate?: string;
  @Prop() desiredWorkAreaId?: string;
  @Prop() desiredTravelActivityId?: string;
  @Prop() careerGoal?: string;
  @Prop() positionRequirements?: string;
  @Prop() interestIds?: string;
}

export const JobRequirementsSchema =
  SchemaFactory.createForClass(JobRequirements);
