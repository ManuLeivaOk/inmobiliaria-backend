import { AmenitiesService } from './amenities.service';
declare class CreateAmenityDto {
    name: string;
}
export declare class AmenitiesController {
    private readonly amenitiesService;
    constructor(amenitiesService: AmenitiesService);
    findAll(): Promise<import("./entities/amenity.entity").Amenity[]>;
    create(dto: CreateAmenityDto): Promise<import("./entities/amenity.entity").Amenity>;
    remove(id: number): Promise<void>;
}
export {};
