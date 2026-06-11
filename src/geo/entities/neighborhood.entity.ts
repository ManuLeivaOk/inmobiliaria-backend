import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { City } from './city.entity';

@Entity({ name: 'neighborhoods' })
export class Neighborhood {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: string;

  @Column({ name: 'city_id', type: 'bigint' })
  cityId!: string;

  @ManyToOne(() => City, (city) => city.neighborhoods, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'city_id' })
  city!: City;

  @Column({ type: 'varchar', length: 100 })
  name!: string;
}
