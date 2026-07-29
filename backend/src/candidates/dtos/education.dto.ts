import { Expose, Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class EducationDetailsDto {
  @Expose()
  @Type(() => Number)
  averageGrade?: number;

  @Expose()
  @Type(() => Number)
  @IsInt()
  educationLevelId!: number;

  @Expose()
  endDate?: string;

  @Expose()
  @Type(() => Number)
  @IsInt()
  fieldOfStudyId!: number;

  @Expose()
  otherMajor!: string; // unused, but sent

  @Expose()
  otherSpecialization!: string; // unused, but sent

  @Expose()
  otherUniversity!: string; // unused, but sent

  @Expose()
  @Type(() => Number)
  specializationId?: number;

  @Expose()
  @IsString()
  startDate!: string;

  @Expose()
  @Type(() => Number)
  @IsInt()
  universityId!: number;
}
