import { ApiProperty } from '@nestjs/swagger';

export class ApiErrorDto {
  @ApiProperty({ example: 401 })
  statusCode!: number;

  @ApiProperty({
    oneOf: [
      { type: 'string', example: 'Credenciales inválidas' },
      {
        type: 'array',
        items: { type: 'string' },
        example: ['email must be an email'],
      },
    ],
  })
  message!: string | string[];

  @ApiProperty({ example: 'Unauthorized', required: false })
  error?: string;
}
