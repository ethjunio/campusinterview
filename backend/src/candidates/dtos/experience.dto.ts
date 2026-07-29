import { Expose } from 'class-transformer';
import { IsInt, IsString, MaxLength, MinLength } from 'class-validator';

import type { DropdownOption } from '@/common/types';

export class ExperiencePositionDto {
  @Expose()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  title!: string;

  @Expose()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  employer!: string;

  @IsInt()
  jobTypeId!: number;

  @Expose()
  jobType?: DropdownOption;

  @Expose()
  @IsString()
  startDate!: string;

  @Expose()
  @IsString()
  endDate!: string;

  @Expose()
  @IsString()
  @MaxLength(500)
  description!: string;
}
