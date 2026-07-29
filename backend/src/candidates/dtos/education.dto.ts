import { Expose } from 'class-transformer';
import { IsInt, IsNumber, IsString } from 'class-validator';

export class EducationDetailsDto {
  @Expose()
  @IsNumber()
  averageGrade!: number;

  @Expose()
  @IsInt()
  educationLevelId!: number;

  @Expose()
  @IsString()
  endDate!: string;

  @Expose()
  @IsInt()
  fieldOfStudyId!: number;

  @Expose()
  otherMajor!: string; // unused, but sent

  @Expose()
  otherSpecialization!: string; // unused, but sent

  @Expose()
  otherUniversity!: string; // unused, but sent

  @Expose()
  @IsInt()
  specializationId!: number;

  @Expose()
  @IsString()
  startDate!: string;

  @Expose()
  @IsInt()
  universityId!: number;
}
