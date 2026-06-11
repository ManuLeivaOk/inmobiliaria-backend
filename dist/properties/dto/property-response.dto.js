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
exports.PaginatedPropertyResponseDto = exports.PropertyResponseDto = exports.GeoSummaryDto = exports.PropertyUserSummaryDto = exports.PropertyFeatureResponseDto = exports.AmenityResponseDto = exports.PropertyImageResponseDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const property_enums_1 = require("../enums/property.enums");
class PropertyImageResponseDto {
    id;
    imageUrl;
    position;
    isCover;
    createdAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, imageUrl: { required: true, type: () => String }, position: { required: true, type: () => Number }, isCover: { required: true, type: () => Boolean }, createdAt: { required: true, type: () => Date } };
    }
}
exports.PropertyImageResponseDto = PropertyImageResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PropertyImageResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PropertyImageResponseDto.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PropertyImageResponseDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], PropertyImageResponseDto.prototype, "isCover", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], PropertyImageResponseDto.prototype, "createdAt", void 0);
class AmenityResponseDto {
    id;
    name;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String } };
    }
}
exports.AmenityResponseDto = AmenityResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AmenityResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AmenityResponseDto.prototype, "name", void 0);
class PropertyFeatureResponseDto {
    id;
    featureKey;
    featureValue;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, featureKey: { required: true, type: () => String }, featureValue: { required: true, type: () => String } };
    }
}
exports.PropertyFeatureResponseDto = PropertyFeatureResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PropertyFeatureResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PropertyFeatureResponseDto.prototype, "featureKey", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PropertyFeatureResponseDto.prototype, "featureValue", void 0);
class PropertyUserSummaryDto {
    id;
    firstName;
    lastName;
    email;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, firstName: { required: true, type: () => String }, lastName: { required: true, type: () => String }, email: { required: true, type: () => String } };
    }
}
exports.PropertyUserSummaryDto = PropertyUserSummaryDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PropertyUserSummaryDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PropertyUserSummaryDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PropertyUserSummaryDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PropertyUserSummaryDto.prototype, "email", void 0);
class GeoSummaryDto {
    id;
    name;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, name: { required: true, type: () => String } };
    }
}
exports.GeoSummaryDto = GeoSummaryDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], GeoSummaryDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], GeoSummaryDto.prototype, "name", void 0);
class PropertyResponseDto {
    id;
    title;
    description;
    operationType;
    propertyType;
    price;
    currency;
    address;
    suitableForMortgageCredit;
    availableServices;
    weHaveTheKey;
    contact;
    publicationLink;
    country;
    province;
    city;
    neighborhood;
    latitude;
    longitude;
    rooms;
    bedrooms;
    bathrooms;
    garage;
    coveredArea;
    totalArea;
    propertyAge;
    floorNumber;
    status;
    publishedAt;
    assignedSeller;
    createdBy;
    createdAt;
    updatedAt;
    images;
    amenities;
    features;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, title: { required: true, type: () => String }, description: { required: true, type: () => String, nullable: true }, operationType: { required: true, enum: require("../enums/property.enums").PropertyOperationType }, propertyType: { required: true, enum: require("../enums/property.enums").PropertyType }, price: { required: true, type: () => Number }, currency: { required: true, enum: require("../enums/property.enums").Currency }, address: { required: true, type: () => String, nullable: true }, suitableForMortgageCredit: { required: true, type: () => Boolean }, availableServices: { required: true, type: () => [String] }, weHaveTheKey: { required: true, type: () => Boolean }, contact: { required: true, type: () => String, nullable: true }, publicationLink: { required: true, type: () => String, nullable: true }, country: { required: true, type: () => require("./property-response.dto").GeoSummaryDto, nullable: true }, province: { required: true, type: () => require("./property-response.dto").GeoSummaryDto, nullable: true }, city: { required: true, type: () => require("./property-response.dto").GeoSummaryDto, nullable: true }, neighborhood: { required: true, type: () => require("./property-response.dto").GeoSummaryDto, nullable: true }, latitude: { required: true, type: () => Number, nullable: true }, longitude: { required: true, type: () => Number, nullable: true }, rooms: { required: true, type: () => Number, nullable: true }, bedrooms: { required: true, type: () => Number, nullable: true }, bathrooms: { required: true, type: () => Number, nullable: true }, garage: { required: true, type: () => Boolean }, coveredArea: { required: true, type: () => Number, nullable: true }, totalArea: { required: true, type: () => Number, nullable: true }, propertyAge: { required: true, type: () => Number, nullable: true }, floorNumber: { required: true, type: () => Number, nullable: true }, status: { required: true, enum: require("../enums/property.enums").PropertyStatus }, publishedAt: { required: true, type: () => Date, nullable: true }, assignedSeller: { required: true, type: () => require("./property-response.dto").PropertyUserSummaryDto, nullable: true }, createdBy: { required: true, type: () => require("./property-response.dto").PropertyUserSummaryDto }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, images: { required: true, type: () => [require("./property-response.dto").PropertyImageResponseDto] }, amenities: { required: true, type: () => [require("./property-response.dto").AmenityResponseDto] }, features: { required: true, type: () => [require("./property-response.dto").PropertyFeatureResponseDto] } };
    }
}
exports.PropertyResponseDto = PropertyResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PropertyResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PropertyResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], PropertyResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: property_enums_1.PropertyOperationType }),
    __metadata("design:type", String)
], PropertyResponseDto.prototype, "operationType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: property_enums_1.PropertyType }),
    __metadata("design:type", String)
], PropertyResponseDto.prototype, "propertyType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PropertyResponseDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: property_enums_1.Currency }),
    __metadata("design:type", String)
], PropertyResponseDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], PropertyResponseDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], PropertyResponseDto.prototype, "suitableForMortgageCredit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [String],
        example: ['agua', 'luz', 'gas', 'cloacas'],
    }),
    __metadata("design:type", Array)
], PropertyResponseDto.prototype, "availableServices", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], PropertyResponseDto.prototype, "weHaveTheKey", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], PropertyResponseDto.prototype, "contact", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], PropertyResponseDto.prototype, "publicationLink", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: GeoSummaryDto, nullable: true }),
    __metadata("design:type", Object)
], PropertyResponseDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: GeoSummaryDto, nullable: true }),
    __metadata("design:type", Object)
], PropertyResponseDto.prototype, "province", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: GeoSummaryDto, nullable: true }),
    __metadata("design:type", Object)
], PropertyResponseDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: GeoSummaryDto, nullable: true }),
    __metadata("design:type", Object)
], PropertyResponseDto.prototype, "neighborhood", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], PropertyResponseDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], PropertyResponseDto.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], PropertyResponseDto.prototype, "rooms", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], PropertyResponseDto.prototype, "bedrooms", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], PropertyResponseDto.prototype, "bathrooms", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], PropertyResponseDto.prototype, "garage", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], PropertyResponseDto.prototype, "coveredArea", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], PropertyResponseDto.prototype, "totalArea", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], PropertyResponseDto.prototype, "propertyAge", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], PropertyResponseDto.prototype, "floorNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: property_enums_1.PropertyStatus }),
    __metadata("design:type", String)
], PropertyResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ nullable: true }),
    __metadata("design:type", Object)
], PropertyResponseDto.prototype, "publishedAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: PropertyUserSummaryDto, nullable: true }),
    __metadata("design:type", Object)
], PropertyResponseDto.prototype, "assignedSeller", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: PropertyUserSummaryDto }),
    __metadata("design:type", PropertyUserSummaryDto)
], PropertyResponseDto.prototype, "createdBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], PropertyResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], PropertyResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [PropertyImageResponseDto] }),
    __metadata("design:type", Array)
], PropertyResponseDto.prototype, "images", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [AmenityResponseDto] }),
    __metadata("design:type", Array)
], PropertyResponseDto.prototype, "amenities", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [PropertyFeatureResponseDto] }),
    __metadata("design:type", Array)
], PropertyResponseDto.prototype, "features", void 0);
class PaginatedPropertyResponseDto {
    data;
    meta;
    static _OPENAPI_METADATA_FACTORY() {
        return { data: { required: true, type: () => [require("./property-response.dto").PropertyResponseDto] }, meta: { required: true, type: () => ({ total: { required: true, type: () => Number }, page: { required: true, type: () => Number }, limit: { required: true, type: () => Number }, totalPages: { required: true, type: () => Number } }) } };
    }
}
exports.PaginatedPropertyResponseDto = PaginatedPropertyResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [PropertyResponseDto] }),
    __metadata("design:type", Array)
], PaginatedPropertyResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Object)
], PaginatedPropertyResponseDto.prototype, "meta", void 0);
//# sourceMappingURL=property-response.dto.js.map