import { Expose } from 'class-transformer';
import { IsInt, IsString, MaxLength } from 'class-validator';

import type { DropdownOption } from '@/common/types';

export class SkillPositionDto {
  @IsInt()
  itSkillId!: number;

  @Expose()
  itSkill?: DropdownOption;

  @IsInt()
  skillLevelId!: number;

  @Expose()
  skillLevel?: DropdownOption;

  @Expose()
  @IsString()
  @MaxLength(500)
  description!: string;
}
