import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, MaxLength } from 'class-validator';

import { FaqType } from '../schemas/faq.schema';

export class AddFaqDto {
  @ApiProperty({ maxLength: 300 })
  @IsNotEmpty()
  @MaxLength(300)
  question!: string;

  @ApiProperty({ maxLength: 2000 })
  @IsNotEmpty()
  @MaxLength(2000)
  answer!: string;

  @ApiProperty({ enum: FaqType })
  @IsEnum(FaqType)
  type!: FaqType;
}

export class UpdateFaqDto {
  @ApiProperty({ maxLength: 300 })
  @IsNotEmpty()
  @MaxLength(300)
  question!: string;

  @ApiProperty({ maxLength: 2000 })
  @IsNotEmpty()
  @MaxLength(2000)
  answer!: string;
}
