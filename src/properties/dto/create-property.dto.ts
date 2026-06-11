import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import {
  AvailableService,
  Currency,
  PropertyOperationType,
  PropertyStatus,
  PropertyType,
} from '../enums/property.enums';
import {
  PropertyFeatureInputDto,
  PropertyImageInputDto,
} from './property-nested.dto';

export class CreatePropertyDto {
  @ApiProperty({
    maxLength: 255,
    example: 'Departamento 3 ambientes en Palermo',
  })
  @IsString()
  @MaxLength(255)
  title!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ enum: PropertyOperationType })
  @IsEnum(PropertyOperationType)
  operationType!: PropertyOperationType;

  @ApiProperty({ enum: PropertyType })
  @IsEnum(PropertyType)
  propertyType!: PropertyType;

  @ApiProperty({ example: 185000.5 })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price!: number;

  @ApiProperty({ enum: Currency })
  @IsEnum(Currency)
  currency!: Currency;

  @ApiPropertyOptional({ maxLength: 255 })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  address?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  countryId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  provinceId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  cityId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  neighborhoodId?: number;

  @ApiPropertyOptional({ example: -34.603722 })
  @IsOptional()
  @Type(() => Number)
  @IsLatitude()
  latitude?: number;

  @ApiPropertyOptional({ example: -58.381592 })
  @IsOptional()
  @Type(() => Number)
  @IsLongitude()
  longitude?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  rooms?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  bedrooms?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  bathrooms?: number;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  garage?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  coveredArea?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  totalArea?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  propertyAge?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  floorNumber?: number;

  @ApiPropertyOptional({
    enum: PropertyStatus,
    default: PropertyStatus.BORRADOR,
  })
  @IsOptional()
  @IsEnum(PropertyStatus)
  status?: PropertyStatus;

  @ApiPropertyOptional({
    description: 'Solo ADMIN puede asignar otro vendedor',
  })
  @IsOptional()
  @IsUUID()
  assignedSellerId?: string;

  @ApiPropertyOptional({ type: [PropertyImageInputDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PropertyImageInputDto)
  images?: PropertyImageInputDto[];

  @ApiPropertyOptional({ type: [Number], example: [1, 2, 3] })
  @IsOptional()
  @IsArray()
  @Type(() => Number)
  @IsInt({ each: true })
  amenityIds?: number[];

  @ApiPropertyOptional({ type: [PropertyFeatureInputDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PropertyFeatureInputDto)
  features?: PropertyFeatureInputDto[];

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  suitableForMortgageCredit?: boolean;

  @ApiPropertyOptional({
    enum: AvailableService,
    isArray: true,
    example: ['agua', 'gas', 'pavimento'],
  })
  @IsOptional()
  @IsArray()
  @IsEnum(AvailableService, { each: true })
  availableServices?: AvailableService[];

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  weHaveTheKey?: boolean;

  @ApiPropertyOptional({
    example: '+54 9 351 1234567',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  contact?: string;

  @ApiPropertyOptional({
    example: 'https://www.zonaprop.com.ar/propiedad-123',
  })
  @IsOptional()
  @IsString()
  @MaxLength(2048)
  publicationLink?: string;
}
