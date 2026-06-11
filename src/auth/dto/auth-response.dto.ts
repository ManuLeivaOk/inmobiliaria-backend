import { ApiProperty } from '@nestjs/swagger';
import { SafeUserDto } from './safe-user.dto';

export class AuthResponseDto {
  @ApiProperty({
    description: 'JWT de acceso. Enviar como Bearer en rutas protegidas.',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken!: string;

  @ApiProperty({ example: '15m' })
  expiresIn!: string;

  @ApiProperty({ example: 'Bearer', enum: ['Bearer'] })
  tokenType!: 'Bearer';

  @ApiProperty({ type: SafeUserDto })
  user!: SafeUserDto;
}
