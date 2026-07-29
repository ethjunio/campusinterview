import { UserResponseDto } from '@/users/dtos/user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignInRequestDto {
  @ApiProperty({ default: 'admin@algolas.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ default: 'password123' })
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password!: string;
}

export class SignInResponseDto {
  @ApiProperty()
  user!: UserResponseDto;

  @ApiProperty()
  accessToken!: string;
}
