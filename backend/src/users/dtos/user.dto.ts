import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum } from 'class-validator';

import { UserType } from '@/users/schemas/user.schema';

export class UserResponseDto {
  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsEnum(UserType)
  type!: UserType;
}
