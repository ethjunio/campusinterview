import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum } from 'class-validator';

import { UserType } from '@/users/schemas/user.schema';
import { Expose } from 'class-transformer';

export class UserResponseDto {
  @ApiProperty()
  @Expose()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @Expose()
  @IsEnum(UserType)
  type!: UserType;

  @ApiProperty()
  @Expose()
  candidateOnboardingState?: string;

  @ApiProperty()
  @Expose()
  companyOnboardingState?: string;
}
