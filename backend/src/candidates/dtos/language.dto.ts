import { Expose } from 'class-transformer';
import { IsInt, IsString, MaxLength } from 'class-validator';

import type { DropdownOption, LanguageDropdownOption } from '@/common/types';

export class LanguagePositionDto {
  @IsString()
  languageCode!: string;

  @Expose()
  language?: LanguageDropdownOption;

  @IsInt()
  languageLevelId!: number;

  @Expose()
  languageLevel?: DropdownOption;

  @Expose()
  @IsString()
  @MaxLength(500)
  qualification!: string;
}
