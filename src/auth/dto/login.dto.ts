import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'vendedor@inmobiliaria.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({
    minLength: 8,
    example: 'MiPasswordSeguro1!',
    format: 'password',
  })
  @IsString()
  @MinLength(8)
  password!: string;
}
