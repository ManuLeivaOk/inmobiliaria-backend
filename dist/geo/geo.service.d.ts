import { Repository } from 'typeorm';
import { City } from './entities/city.entity';
import { Country } from './entities/country.entity';
import { Neighborhood } from './entities/neighborhood.entity';
import { Province } from './entities/province.entity';
export declare class GeoService {
    private readonly countryRepo;
    private readonly provinceRepo;
    private readonly cityRepo;
    private readonly neighborhoodRepo;
    constructor(countryRepo: Repository<Country>, provinceRepo: Repository<Province>, cityRepo: Repository<City>, neighborhoodRepo: Repository<Neighborhood>);
    findCountries(): Promise<Country[]>;
    findProvinces(countryId?: string): Promise<Province[]>;
    findCities(provinceId?: string): Promise<City[]>;
    findNeighborhoods(cityId?: string): Promise<Neighborhood[]>;
}
