import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Property } from './property.entity';

@Entity({ name: 'property_images' })
export class PropertyImage {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'property_id', type: 'uuid' })
  propertyId!: string;

  @ManyToOne(() => Property, (property) => property.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'property_id' })
  property!: Property;

  @Column({ name: 'image_url', type: 'text' })
  imageUrl!: string;

  @Column({ type: 'int', default: 0 })
  position!: number;

  @Column({ name: 'is_cover', type: 'boolean', default: false })
  isCover!: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt!: Date;
}
