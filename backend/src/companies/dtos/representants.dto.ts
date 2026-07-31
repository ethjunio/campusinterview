import { Expose } from 'class-transformer';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CompanyRepresentantDto {
  @Expose()
  id?: any; // do we need that?

  @Expose()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  fullName!: string;

  @Expose()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  position!: string;

  @Expose()
  @IsEmail()
  email!: string;

  @Expose()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  password!: string;

  @Expose()
  attending!: boolean;

  @Expose()
  attendanceSlot?: any; // do we need that?

  @Expose()
  areDailyNotificationsEnabled!: boolean;
}
