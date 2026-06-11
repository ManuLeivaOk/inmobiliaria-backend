import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './entities/city.entity';
import { Country } from './entities/country.entity';
import { Neighborhood } from './entities/neighborhood.entity';
import { Province } from './entities/province.entity';

@Injectable()
export class GeoService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepo: Repository<Country>,
    @InjectRepository(Province)
    private readonly provinceRepo: Repository<Province>,
    @InjectRepository(City)
    private readonly cityRepo: Repository<City>,
    @InjectRepository(Neighborhood)
    private readonly neighborhoodRepo: Repository<Neighborhood>,
  ) {}

  findCountries() {
    return this.countryRepo.find({ order: { name: 'ASC' } });
  }

  findProvinces(countryId?: string) {
    return this.provinceRepo.find({
      where: countryId ? { countryId } : {},
      order: { name: 'ASC' },
    });
  }

  findCities(provinceId?: string) {
    return this.cityRepo.find({
      where: provinceId ? { provinceId } : {},
      order: { name: 'ASC' },
    });
  }

  findNeighborhoods(cityId?: string) {
    return this.neighborhoodRepo.find({
      where: cityId ? { cityId } : {},
      order: { name: 'ASC' },
    });
  }
}
