import { ApiProperty } from '@nestjs/swagger';

export class AdminPingResponseDto {
  @ApiProperty({ example: true })
  ok!: boolean;

  @ApiProperty({ example: 'admin' })
  scope!: string;
}
