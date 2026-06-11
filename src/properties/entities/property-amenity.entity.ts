import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Amenity } from '../../amenities/entities/amenity.entity';
import { Property } from './property.entity';

@Entity({ name: 'property_amenities' })
export class PropertyAmenity {
  @PrimaryColumn({ name: 'property_id', type: 'uuid' })
  propertyId!: string;

  @PrimaryColumn({ name: 'amenity_id', type: 'bigint' })
  amenityId!: string;

  @ManyToOne(() => Property, (property) => property.propertyAmenities, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'property_id' })
  property!: Property;

  @ManyToOne(() => Amenity, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'amenity_id' })
  amenity!: Amenity;
}
