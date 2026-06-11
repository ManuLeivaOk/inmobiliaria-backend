import { Amenity } from '../../amenities/entities/amenity.entity';
import { Property } from './property.entity';
export declare class PropertyAmenity {
    propertyId: string;
    amenityId: string;
    property: Property;
    amenity: Amenity;
}
