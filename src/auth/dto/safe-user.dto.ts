import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '../../users/enums/user-role.enum';

export class SafeUserDto {
  @ApiProperty({ format: 'uuid', example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  id!: string;

  @ApiProperty({ example: 'María' })
  firstName!: string;

  @ApiProperty({ example: 'González' })
  lastName!: string;

  @ApiProperty({ example: 'maria@inmobiliaria.com' })
  email!: string;

  @ApiPropertyOptional({ example: '+5491112345678', nullable: true })
  phone!: string | null;

  @ApiProperty({ enum: UserRole, example: UserRole.VENDEDOR })
  role!: UserRole;

  @ApiProperty({ example: false })
  isVerified!: boolean;
}
