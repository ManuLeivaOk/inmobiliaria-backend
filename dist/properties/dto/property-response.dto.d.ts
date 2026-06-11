import { Currency, PropertyOperationType, PropertyStatus, PropertyType } from '../enums/property.enums';
export declare class PropertyImageResponseDto {
    id: string;
    imageUrl: string;
    position: number;
    isCover: boolean;
    createdAt: Date;
}
export declare class AmenityResponseDto {
    id: string;
    name: string;
}
export declare class PropertyFeatureResponseDto {
    id: string;
    featureKey: string;
    featureValue: string;
}
export declare class PropertyUserSummaryDto {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}
export declare class GeoSummaryDto {
    id: string;
    name: string;
}
export declare class PropertyResponseDto {
    id: string;
    title: string;
    description: string | null;
    operationType: PropertyOperationType;
    propertyType: PropertyType;
    price: number;
    currency: Currency;
    address: string | null;
    suitableForMortgageCredit: boolean;
    availableServices: string[];
    weHaveTheKey: boolean;
    contact: string | null;
    publicationLink: string | null;
    country: GeoSummaryDto | null;
    province: GeoSummaryDto | null;
    city: GeoSummaryDto | null;
    neighborhood: GeoSummaryDto | null;
    latitude: number | null;
    longitude: number | null;
    rooms: number | null;
    bedrooms: number | null;
    bathrooms: number | null;
    garage: boolean;
    coveredArea: number | null;
    totalArea: number | null;
    propertyAge: number | null;
    floorNumber: number | null;
    status: PropertyStatus;
    publishedAt: Date | null;
    assignedSeller: PropertyUserSummaryDto | null;
    createdBy: PropertyUserSummaryDto;
    createdAt: Date;
    updatedAt: Date;
    images: PropertyImageResponseDto[];
    amenities: AmenityResponseDto[];
    features: PropertyFeatureResponseDto[];
}
export declare class PaginatedPropertyResponseDto {
    data: PropertyResponseDto[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}
