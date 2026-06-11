import { City } from './city.entity';
import { Country } from './country.entity';
export declare class Province {
    id: string;
    countryId: string;
    country: Country;
    name: string;
    cities: City[];
}
