import { Neighborhood } from './neighborhood.entity';
import { Province } from './province.entity';
export declare class City {
    id: string;
    provinceId: string;
    province: Province;
    name: string;
    neighborhoods: Neighborhood[];
}
