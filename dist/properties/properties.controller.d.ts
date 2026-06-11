import { AuthenticatedUser } from '../common/interfaces/authenticated-user.interface';
import { PropertyResponseDto } from './dto/property-response.dto';
import { QueryPropertyDto } from './dto/query-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PropertiesService } from './properties.service';
import { UploadsService } from '../modules/uploads/services/uploads.service';
export declare class PropertiesController {
    private readonly propertiesService;
    private readonly uploadsService;
    constructor(propertiesService: PropertiesService, uploadsService: UploadsService);
    create(files: Express.Multer.File[], rawData: string, user: AuthenticatedUser, imagesMetadata: string[]): Promise<PropertyResponseDto>;
    findAll(query: QueryPropertyDto, user: AuthenticatedUser): Promise<import("../common/dto/pagination.dto").PaginatedResult<PropertyResponseDto>>;
    findOne(id: string, user: AuthenticatedUser): Promise<PropertyResponseDto>;
    update(id: string, dto: UpdatePropertyDto, user: AuthenticatedUser): Promise<PropertyResponseDto>;
    remove(id: string, user: AuthenticatedUser): Promise<void>;
}
