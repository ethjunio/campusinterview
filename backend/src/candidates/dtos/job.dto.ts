import { Expose } from "class-transformer";

export class JobRequirementsDto {
  @Expose()
  desiredJobTypeId?: string;

  @Expose()
  startDate?: string;

  @Expose()
  desiredWorkAreaId?: string;

  @Expose()
  desiredTravelActivityId?: string;

  @Expose()
  careerGoal?: string;

  @Expose()
  positionRequirements?: string;

  @Expose()
  interestIds?: string;
}
