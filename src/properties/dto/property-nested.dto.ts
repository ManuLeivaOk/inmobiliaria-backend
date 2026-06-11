import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  Min,
} from 'class-validator';

export class PropertyImageInputDto {
  @ApiProperty({ example: 'https://cdn.example.com/img1.jpg' })
  @IsUrl({}, { message: 'imageUrl debe ser una URL válida' })
  imageUrl!: string;

  @ApiPropertyOptional({ default: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  position?: number;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isCover?: boolean;
}

export class PropertyFeatureInputDto {
  @ApiProperty({ example: 'orientation' })
  @IsString()
  @MaxLength(100)
  featureKey!: string;

  @ApiProperty({ example: 'Norte' })
  @IsString()
  featureValue!: string;
}
