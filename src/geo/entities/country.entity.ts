import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { City } from './city.entity';
import { Province } from './province.entity';

@Entity({ name: 'countries' })
export class Country {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  name!: string;

  @OneToMany(() => Province, (province) => province.country)
  provinces!: Province[];
}
