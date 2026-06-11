import { AvailableService, Currency, PropertyOperationType, PropertyStatus, PropertyType } from '../properties/enums/property.enums';
export type SeedNeighborhoodName = 'Barrio Centro' | 'Barrio Alberdi' | 'Barrio Parque';
export interface SeedPropertyDefinition {
    title: string;
    description: string;
    operationType: PropertyOperationType;
    propertyType: PropertyType;
    price: number;
    currency: Currency;
    status: PropertyStatus;
    address: string;
    neighborhoodName: SeedNeighborhoodName;
    rooms?: number;
    bedrooms?: number;
    bathrooms?: number;
    garage?: boolean;
    coveredArea?: number;
    totalArea?: number;
    propertyAge?: number;
    floorNumber?: number;
    latitude?: number;
    longitude?: number;
    imageUrl: string;
    features?: {
        featureKey: string;
        featureValue: string;
    }[];
    suitableForMortgageCredit?: boolean;
    availableServices?: AvailableService[];
    weHaveTheKey?: boolean;
    contact?: string;
    publicationLink?: string;
    assignedToVendedor?: boolean;
}
export declare const SEED_AMENITIES: readonly ["Piscina", "Gimnasio", "SUM", "Balcón", "Terraza", "Aire acondicionado", "Calefacción", "Amoblado", "Mascotas permitidas", "Cochera cubierta"];
export declare const SEED_PROPERTIES: SeedPropertyDefinition[];
