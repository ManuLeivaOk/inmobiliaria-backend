import { OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { Amenity } from '../amenities/entities/amenity.entity';
import { City } from '../geo/entities/city.entity';
import { Country } from '../geo/entities/country.entity';
import { Neighborhood } from '../geo/entities/neighborhood.entity';
import { Province } from '../geo/entities/province.entity';
import { Property } from '../properties/entities/property.entity';
import { PropertiesService } from '../properties/properties.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
export declare const SEED_GEO: {
    readonly country: "Argentina";
    readonly province: "Córdoba";
    readonly city: "Río Cuarto";
    readonly neighborhoods: readonly ["Barrio Centro", "Barrio Alberdi", "Barrio Parque"];
};
export declare class DatabaseSeedService implements OnApplicationBootstrap {
    private readonly config;
    private readonly usersService;
    private readonly propertiesService;
    private readonly countryRepo;
    private readonly provinceRepo;
    private readonly cityRepo;
    private readonly neighborhoodRepo;
    private readonly usersRepo;
    private readonly propertyRepo;
    private readonly amenityRepo;
    private readonly logger;
    constructor(config: ConfigService, usersService: UsersService, propertiesService: PropertiesService, countryRepo: Repository<Country>, provinceRepo: Repository<Province>, cityRepo: Repository<City>, neighborhoodRepo: Repository<Neighborhood>, usersRepo: Repository<User>, propertyRepo: Repository<Property>, amenityRepo: Repository<Amenity>);
    onApplicationBootstrap(): Promise<void>;
    private hasSeedGeo;
    private seedGeo;
    private seedUsers;
    private seedAmenities;
    private seedProperties;
    private resolveGeoIds;
}
