import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { City } from './city.entity';
import { Country } from './country.entity';

@Entity({ name: 'provinces' })
export class Province {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: string;

  @Column({ name: 'country_id', type: 'bigint' })
  countryId!: string;

  @ManyToOne(() => Country, (country) => country.provinces, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'country_id' })
  country!: Country;

  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @OneToMany(() => City, (city) => city.province)
  cities!: City[];
}
