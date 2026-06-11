import { Repository } from 'typeorm';
import { Amenity } from './entities/amenity.entity';
export declare class AmenitiesService {
    private readonly amenityRepo;
    constructor(amenityRepo: Repository<Amenity>);
    findAll(): Promise<Amenity[]>;
    create(name: string): Promise<Amenity>;
    remove(id: string): Promise<void>;
}
