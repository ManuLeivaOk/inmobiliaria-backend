import { GeoService } from './geo.service';
export declare class GeoController {
    private readonly geoService;
    constructor(geoService: GeoService);
    countries(): Promise<import("./entities/country.entity").Country[]>;
    provinces(countryId?: string): Promise<import("./entities/province.entity").Province[]>;
    cities(provinceId?: string): Promise<import("./entities/city.entity").City[]>;
    neighborhoods(cityId?: string): Promise<import("./entities/neighborhood.entity").Neighborhood[]>;
}
