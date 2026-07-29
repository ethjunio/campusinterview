import { Expose } from 'class-transformer';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class ExtracurricularPositionDto {
  @Expose()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  title!: string;

  @Expose()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  activity!: string;

  @Expose()
  @IsString()
  startDate!: string;

  @Expose()
  @IsString()
  endDate!: string;

  @Expose()
  @IsString()
  @MaxLength(500)
  description!: string;
}
