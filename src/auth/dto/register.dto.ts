import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRole } from '../../users/enums/user-role.enum';

export class RegisterDto {
  @ApiProperty({ maxLength: 100, example: 'Juan' })
  @IsString()
  @MaxLength(100)
  firstName!: string;

  @ApiProperty({ maxLength: 100, example: 'Pérez' })
  @IsString()
  @MaxLength(100)
  lastName!: string;

  @ApiProperty({ example: 'juan.perez@inmobiliaria.com' })
  @IsEmail()
  email!: string;

  @ApiPropertyOptional({ maxLength: 50, example: '+5491198765432' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  phone?: string;

  @ApiProperty({
    minLength: 12,
    example: 'ContraseñaSegura123!',
    format: 'password',
    description: 'Mínimo 12 caracteres',
  })
  @IsString()
  @MinLength(12, {
    message: 'La contraseña debe tener al menos 12 caracteres',
  })
  password!: string;

  @ApiPropertyOptional({
    enum: UserRole,
    description:
      'Solo un ADMIN autenticado puede crear usuarios ADMIN. Por defecto: VENDEDOR.',
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
