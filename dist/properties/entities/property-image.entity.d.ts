import { Property } from './property.entity';
export declare class PropertyImage {
    id: string;
    propertyId: string;
    property: Property;
    imageUrl: string;
    position: number;
    isCover: boolean;
    createdAt: Date;
}
