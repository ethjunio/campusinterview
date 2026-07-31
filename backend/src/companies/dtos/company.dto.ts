import { DropdownOption } from '@/common/types';
import { Expose } from 'class-transformer';
import { ContactPersonDto } from './contact.dto';
import { CompanyRepresentantDto } from './representants.dto';

export class CompanyDto {
  @Expose() name?: string;
  @Expose() description?: string;
  @Expose() website?: string;
  @Expose() industries?: number[];

  @Expose() corporateActivity?: string;
  @Expose() headquarterLocation?: string;
  @Expose() philosophy?: string;
  @Expose() shareOfGraduates?: number;
  @Expose() swissEmployeeCount?: number;
  @Expose() swissOfficeLocation?: string;
  @Expose() worldEmployeeCount?: number;

  @Expose() culture?: string;
  @Expose() fieldsOfStudy?: DropdownOption[]; // searched majors
  @Expose() lookingFor?: string;
  @Expose() mainLanguage?: string;
  @Expose() offeredPositionTypes?: DropdownOption[];
  @Expose() startingSalary?: string;
  @Expose() weOffer?: string;

  @Expose() CompanyContacts?: ContactPersonDto[];
  @Expose() CompanyIndustries?: any;
  @Expose() participants?: CompanyRepresentantDto[];
  @Expose() companyOpen?: any;
}
