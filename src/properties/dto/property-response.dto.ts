import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Currency,
  PropertyOperationType,
  PropertyStatus,
  PropertyType,
} from '../enums/property.enums';

export class PropertyImageResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  imageUrl!: string;

  @ApiProperty()
  position!: number;

  @ApiProperty()
  isCover!: boolean;

  @ApiProperty()
  createdAt!: Date;
}

export class AmenityResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;
}

export class PropertyFeatureResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  featureKey!: string;

  @ApiProperty()
  featureValue!: string;
}

export class PropertyUserSummaryDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  firstName!: string;

  @ApiProperty()
  lastName!: string;

  @ApiProperty()
  email!: string;
}

export class GeoSummaryDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;
}

export class PropertyResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  title!: string;

  @ApiPropertyOptional({ nullable: true })
  description!: string | null;

  @ApiProperty({ enum: PropertyOperationType })
  operationType!: PropertyOperationType;

  @ApiProperty({ enum: PropertyType })
  propertyType!: PropertyType;

  @ApiProperty()
  price!: number;

  @ApiProperty({ enum: Currency })
  currency!: Currency;

  @ApiPropertyOptional({ nullable: true })
  address!: string | null;

  @ApiProperty()
  suitableForMortgageCredit!: boolean;

  @ApiProperty({
    type: [String],
    example: ['agua', 'luz', 'gas', 'cloacas'],
  })
  availableServices!: string[];

  @ApiProperty()
  weHaveTheKey!: boolean;

  @ApiPropertyOptional({ nullable: true })
  contact!: string | null;

  @ApiPropertyOptional({ nullable: true })
  publicationLink!: string | null;

  @ApiPropertyOptional({ type: GeoSummaryDto, nullable: true })
  country!: GeoSummaryDto | null;

  @ApiPropertyOptional({ type: GeoSummaryDto, nullable: true })
  province!: GeoSummaryDto | null;

  @ApiPropertyOptional({ type: GeoSummaryDto, nullable: true })
  city!: GeoSummaryDto | null;

  @ApiPropertyOptional({ type: GeoSummaryDto, nullable: true })
  neighborhood!: GeoSummaryDto | null;

  @ApiPropertyOptional({ nullable: true })
  latitude!: number | null;

  @ApiPropertyOptional({ nullable: true })
  longitude!: number | null;

  @ApiPropertyOptional({ nullable: true })
  rooms!: number | null;

  @ApiPropertyOptional({ nullable: true })
  bedrooms!: number | null;

  @ApiPropertyOptional({ nullable: true })
  bathrooms!: number | null;

  @ApiProperty()
  garage!: boolean;

  @ApiPropertyOptional({ nullable: true })
  coveredArea!: number | null;

  @ApiPropertyOptional({ nullable: true })
  totalArea!: number | null;

  @ApiPropertyOptional({ nullable: true })
  propertyAge!: number | null;

  @ApiPropertyOptional({ nullable: true })
  floorNumber!: number | null;

  @ApiProperty({ enum: PropertyStatus })
  status!: PropertyStatus;

  @ApiPropertyOptional({ nullable: true })
  publishedAt!: Date | null;

  @ApiPropertyOptional({ type: PropertyUserSummaryDto, nullable: true })
  assignedSeller!: PropertyUserSummaryDto | null;

  @ApiProperty({ type: PropertyUserSummaryDto })
  createdBy!: PropertyUserSummaryDto;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  @ApiProperty({ type: [PropertyImageResponseDto] })
  images!: PropertyImageResponseDto[];

  @ApiProperty({ type: [AmenityResponseDto] })
  amenities!: AmenityResponseDto[];

  @ApiProperty({ type: [PropertyFeatureResponseDto] })
  features!: PropertyFeatureResponseDto[];
}

export class PaginatedPropertyResponseDto {
  @ApiProperty({ type: [PropertyResponseDto] })
  data!: PropertyResponseDto[];

  @ApiProperty()
  meta!: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
