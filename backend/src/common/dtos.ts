import { ApiProperty } from "@nestjs/swagger";

export class DataResponseDto<T> {
  @ApiProperty()
  status!: boolean;

  @ApiProperty()
  message!: string;
}
