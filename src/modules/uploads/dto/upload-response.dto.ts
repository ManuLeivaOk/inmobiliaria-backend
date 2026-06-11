import { ApiProperty } from '@nestjs/swagger';

export class UploadedFileResponseDto {
  @ApiProperty()
  url!: string;

  @ApiProperty()
  width!: number;

  @ApiProperty()
  height!: number;

  @ApiProperty()
  size!: number;
}
