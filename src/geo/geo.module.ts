import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { Country } from './entities/country.entity';
import { Neighborhood } from './entities/neighborhood.entity';
import { Province } from './entities/province.entity';
import { GeoController } from './geo.controller';
import { GeoService } from './geo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Country, Province, City, Neighborhood]),
  ],
  controllers: [GeoController],
  providers: [GeoService],
  exports: [GeoService],
})
export class GeoModule {}
