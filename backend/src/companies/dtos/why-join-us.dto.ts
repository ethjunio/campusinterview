import type { DropdownOption } from '@/common/types';
import { Expose } from 'class-transformer';

export class CompanyWhyJoinUsDataDto {
  @Expose() culture?: string;
  @Expose() fieldsOfStudy?: DropdownOption[]; // searched majors
  @Expose() lookingFor?: string;
  @Expose() mainLanguage?: string;
  @Expose() offeredPositionTypes?: DropdownOption[];
  @Expose() startingSalary?: string;
  @Expose() weOffer?: string;
}
