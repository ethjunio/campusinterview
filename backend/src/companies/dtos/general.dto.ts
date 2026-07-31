import { Expose, Transform } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CompanyGeneralDataDto {
  @Expose()
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name!: string;

  @Expose()
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  description!: string;

  @Expose()
  @IsUrl()
  website!: string;

  @Expose()
  @Transform(({ value }) => {
    if (typeof value === 'string') return value.split(',').map(Number);
    if (Array.isArray(value)) return value.map(Number);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return value;
  })
  @IsInt({ each: true })
  @IsArray()
  industries!: number[];
}
