import { Expose } from 'class-transformer';

export class CompanyFactsFiguresDataDto {
  @Expose() corporateActivity?: string;
  @Expose() headquarterLocation?: string;
  @Expose() philosophy?: string;
  @Expose() shareOfGraduates?: number;
  @Expose() swissEmployeeCount?: number;
  @Expose() swissOfficeLocation?: string;
  @Expose() worldEmployeeCount?: number;
}
