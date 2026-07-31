import { Expose, Type } from 'class-transformer';
import { IsInt, IsString, MaxLength, MinLength } from 'class-validator';

export class PersonalDataDto {
  @Expose()
  @IsString()
  salutation!: string;

  @Expose()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  firstName!: string;

  @Expose()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  lastName!: string;

  @Expose()
  @MaxLength(5)
  countryCode?: string;

  @Expose()
  @IsString()
  @MaxLength(50)
  phoneNumber!: string;

  @Expose()
  @IsString()
  @MaxLength(50)
  dateOfBirth!: string;

  @Expose()
  @IsString()
  @MaxLength(50)
  city!: string;

  @Expose()
  @IsString()
  @MaxLength(50)
  country!: string;

  @Expose()
  @Type(() => Number)
  @IsInt()
  nationalityId!: number;

  @Expose()
  @Type(() => Number)
  @IsInt()
  residencePermitId!: number;

  @Expose()
  @Type(() => Number)
  @IsInt()
  experienceYears!: number;
}
