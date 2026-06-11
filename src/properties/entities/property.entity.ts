import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { City } from '../../geo/entities/city.entity';
import { Country } from '../../geo/entities/country.entity';
import { Neighborhood } from '../../geo/entities/neighborhood.entity';
import { Province } from '../../geo/entities/province.entity';
import { User } from '../../users/entities/user.entity';
import {
  AvailableService,
  Currency,
  PropertyOperationType,
  PropertyStatus,
  PropertyType,
} from '../enums/property.enums';
import { PropertyAmenity } from './property-amenity.entity';
import { PropertyFeature } from './property-feature.entity';
import { PropertyImage } from './property-image.entity';

@Entity({ name: 'properties' })
export class Property {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({
    name: 'operation_type',
    type: 'enum',
    enum: PropertyOperationType,
    enumName: 'property_operation_enum',
  })
  operationType!: PropertyOperationType;

  @Column({
    name: 'property_type',
    type: 'enum',
    enum: PropertyType,
    enumName: 'property_type_enum',
  })
  propertyType!: PropertyType;

  @Column({ type: 'numeric', precision: 14, scale: 2 })
  price!: string;

  @Column({
    type: 'enum',
    enum: Currency,
    enumName: 'currency_enum',
  })
  currency!: Currency;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address!: string | null;

  @Column({ name: 'country_id', type: 'bigint', nullable: true })
  countryId!: string | null;

  @ManyToOne(() => Country, { nullable: true })
  @JoinColumn({ name: 'country_id' })
  country!: Country | null;

  @Column({ name: 'province_id', type: 'bigint', nullable: true })
  provinceId!: string | null;

  @ManyToOne(() => Province, { nullable: true })
  @JoinColumn({ name: 'province_id' })
  province!: Province | null;

  @Column({ name: 'city_id', type: 'bigint', nullable: true })
  cityId!: string | null;

  @ManyToOne(() => City, { nullable: true })
  @JoinColumn({ name: 'city_id' })
  city!: City | null;

  @Column({ name: 'neighborhood_id', type: 'bigint', nullable: true })
  neighborhoodId!: string | null;

  @ManyToOne(() => Neighborhood, { nullable: true })
  @JoinColumn({ name: 'neighborhood_id' })
  neighborhood!: Neighborhood | null;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 7,
    nullable: true,
  })
  latitude: string | null;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 7,
    nullable: true,
  })
  longitude: string | null;

  @Column({ type: 'smallint', nullable: true })
  rooms!: number | null;

  @Column({ type: 'smallint', nullable: true })
  bedrooms!: number | null;

  @Column({ type: 'smallint', nullable: true })
  bathrooms!: number | null;

  @Column({ type: 'boolean', default: false })
  garage!: boolean;

  @Column({
    name: 'covered_area',
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  coveredArea!: string | null;

  @Column({
    name: 'total_area',
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  totalArea!: string | null;

  @Column({ name: 'property_age', type: 'smallint', nullable: true })
  propertyAge!: number | null;

  @Column({ name: 'floor_number', type: 'smallint', nullable: true })
  floorNumber!: number | null;

  @Column({
    type: 'enum',
    enum: PropertyStatus,
    enumName: 'property_status_enum',
    default: PropertyStatus.BORRADOR,
  })
  status!: PropertyStatus;

  @Column({ name: 'published_at', type: 'timestamp', nullable: true })
  publishedAt!: Date | null;

  @Column({ name: 'assigned_seller_id', type: 'uuid', nullable: true })
  assignedSellerId!: string | null;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'assigned_seller_id' })
  assignedSeller!: User | null;

  @Column({ name: 'created_by', type: 'uuid' })
  createdById!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  createdBy!: User;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt!: Date | null;

  @OneToMany(() => PropertyImage, (image) => image.property, {
    cascade: true,
  })
  images!: PropertyImage[];

  @OneToMany(() => PropertyAmenity, (pa) => pa.property, { cascade: true })
  propertyAmenities!: PropertyAmenity[];

  @OneToMany(() => PropertyFeature, (feature) => feature.property, {
    cascade: true,
  })
  features!: PropertyFeature[];

  @Column({
    name: 'suitable_for_mortgage_credit',
    type: 'boolean',
    default: false,
  })
  suitableForMortgageCredit!: boolean;

  @Column({
    name: 'available_services',
    type: 'enum',
    enum: AvailableService,
    enumName: 'available_service_enum',
    array: true,
    nullable: true,
  })
  availableServices!: AvailableService[] | null;

  @Column({
    name: 'we_have_the_key',
    type: 'boolean',
    default: false,
  })
  weHaveTheKey!: boolean;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  contact!: string | null;

  @Column({
    name: 'publication_link',
    type: 'text',
    nullable: true,
  })
  publicationLink!: string | null;
}
