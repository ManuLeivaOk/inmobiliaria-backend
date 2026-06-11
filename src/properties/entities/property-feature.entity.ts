import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Property } from './property.entity';

@Entity({ name: 'property_features' })
export class PropertyFeature {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: string;

  @Column({ name: 'property_id', type: 'uuid' })
  propertyId!: string;

  @ManyToOne(() => Property, (property) => property.features, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'property_id' })
  property!: Property;

  @Column({ name: 'feature_key', type: 'varchar', length: 100 })
  featureKey!: string;

  @Column({ name: 'feature_value', type: 'text' })
  featureValue!: string;
}
