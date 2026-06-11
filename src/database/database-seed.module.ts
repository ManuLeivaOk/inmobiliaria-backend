import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Amenity } from '../amenities/entities/amenity.entity';
import { City } from '../geo/entities/city.entity';
import { Country } from '../geo/entities/country.entity';
import { Neighborhood } from '../geo/entities/neighborhood.entity';
import { Province } from '../geo/entities/province.entity';
import { Property } from '../properties/entities/property.entity';
import { PropertiesModule } from '../properties/properties.module';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { DatabaseSeedService } from './database-seed.service';

@Module({
  imports: [
    UsersModule,
    PropertiesModule,
    TypeOrmModule.forFeature([
      Country,
      Province,
      City,
      Neighborhood,
      User,
      Property,
      Amenity,
    ]),
  ],
  providers: [DatabaseSeedService],
})
export class DatabaseSeedModule {}
