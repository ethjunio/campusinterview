import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';

import { UserType } from '@/users/schemas/user.schema';

export class SignUpRequestDto {
  @ApiProperty({ default: 'admin@algolas.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ default: 'password123' })
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password!: string;

  @ApiProperty({ default: UserType.Candidate })
  @IsEnum(UserType)
  type!: UserType;
}
