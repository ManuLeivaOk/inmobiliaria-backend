import { PaginationQueryDto } from '../../common/dto/pagination.dto';
import { Currency, PropertyOperationType, PropertyStatus, PropertyType } from '../enums/property.enums';
export declare class QueryPropertyDto extends PaginationQueryDto {
    search?: string;
    status?: PropertyStatus;
    operationType?: PropertyOperationType;
    propertyType?: PropertyType;
    currency?: Currency;
    cityId?: number;
    neighborhoodId?: number;
    minPrice?: number;
    maxPrice?: number;
    assignedSellerId?: string;
    createdById?: string;
}
