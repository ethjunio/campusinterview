import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ContactPersonDto {
  @Expose()
  @IsString()
  @MinLength(1)
  @MaxLength(10)
  salutation!: string;

  @Expose()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  firstName!: string;

  @Expose()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  lastName!: string;

  @Expose()
  @IsEmail()
  email!: string;

  @Expose()
  @IsPhoneNumber()
  phoneNumber!: string;

  @Expose()
  language!: string;

  @Expose()
  type?: string;
}

export class CompanyContactDataDto {
  @Expose()
  main!: ContactPersonDto;

  @Expose()
  deputy?: ContactPersonDto;
}
