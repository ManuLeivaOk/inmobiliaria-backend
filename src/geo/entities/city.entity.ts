import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Neighborhood } from './neighborhood.entity';
import { Province } from './province.entity';

@Entity({ name: 'cities' })
export class City {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: string;

  @Column({ name: 'province_id', type: 'bigint' })
  provinceId!: string;

  @ManyToOne(() => Province, (province) => province.cities, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'province_id' })
  province!: Province;

  @Column({ type: 'varchar', length: 100 })
  name!: string;

  @OneToMany(() => Neighborhood, (neighborhood) => neighborhood.city)
  neighborhoods!: Neighborhood[];
}
