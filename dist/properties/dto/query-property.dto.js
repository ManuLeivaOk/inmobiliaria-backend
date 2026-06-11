"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryPropertyDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const pagination_dto_1 = require("../../common/dto/pagination.dto");
const property_enums_1 = require("../enums/property.enums");
class QueryPropertyDto extends pagination_dto_1.PaginationQueryDto {
    search;
    status;
    operationType;
    propertyType;
    currency;
    cityId;
    neighborhoodId;
    minPrice;
    maxPrice;
    assignedSellerId;
    createdById;
    static _OPENAPI_METADATA_FACTORY() {
        return { search: { required: false, type: () => String, maxLength: 255 }, status: { required: false, enum: require("../enums/property.enums").PropertyStatus }, operationType: { required: false, enum: require("../enums/property.enums").PropertyOperationType }, propertyType: { required: false, enum: require("../enums/property.enums").PropertyType }, currency: { required: false, enum: require("../enums/property.enums").Currency }, cityId: { required: false, type: () => Number }, neighborhoodId: { required: false, type: () => Number }, minPrice: { required: false, type: () => Number }, maxPrice: { required: false, type: () => Number }, assignedSellerId: { required: false, type: () => String, format: "uuid" }, createdById: { required: false, type: () => String, format: "uuid" } };
    }
}
exports.QueryPropertyDto = QueryPropertyDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], QueryPropertyDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: property_enums_1.PropertyStatus }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(property_enums_1.PropertyStatus),
    __metadata("design:type", String)
], QueryPropertyDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: property_enums_1.PropertyOperationType }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(property_enums_1.PropertyOperationType),
    __metadata("design:type", String)
], QueryPropertyDto.prototype, "operationType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: property_enums_1.PropertyType }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(property_enums_1.PropertyType),
    __metadata("design:type", String)
], QueryPropertyDto.prototype, "propertyType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: property_enums_1.Currency }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(property_enums_1.Currency),
    __metadata("design:type", String)
], QueryPropertyDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], QueryPropertyDto.prototype, "cityId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], QueryPropertyDto.prototype, "neighborhoodId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], QueryPropertyDto.prototype, "minPrice", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], QueryPropertyDto.prototype, "maxPrice", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], QueryPropertyDto.prototype, "assignedSellerId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], QueryPropertyDto.prototype, "createdById", void 0);
//# sourceMappingURL=query-property.dto.js.map