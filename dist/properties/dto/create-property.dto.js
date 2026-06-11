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
exports.CreatePropertyDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const property_enums_1 = require("../enums/property.enums");
const property_nested_dto_1 = require("./property-nested.dto");
class CreatePropertyDto {
    title;
    description;
    operationType;
    propertyType;
    price;
    currency;
    address;
    countryId;
    provinceId;
    cityId;
    neighborhoodId;
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
    assignedSellerId;
    images;
    amenityIds;
    features;
    suitableForMortgageCredit;
    availableServices;
    weHaveTheKey;
    contact;
    publicationLink;
    static _OPENAPI_METADATA_FACTORY() {
        return { title: { required: true, type: () => String, maxLength: 255 }, description: { required: false, type: () => String }, operationType: { required: true, enum: require("../enums/property.enums").PropertyOperationType }, propertyType: { required: true, enum: require("../enums/property.enums").PropertyType }, price: { required: true, type: () => Number, minimum: 0 }, currency: { required: true, enum: require("../enums/property.enums").Currency }, address: { required: false, type: () => String, maxLength: 255 }, countryId: { required: false, type: () => Number }, provinceId: { required: false, type: () => Number }, cityId: { required: false, type: () => Number }, neighborhoodId: { required: false, type: () => Number }, latitude: { required: false, type: () => Number }, longitude: { required: false, type: () => Number }, rooms: { required: false, type: () => Number, minimum: 0 }, bedrooms: { required: false, type: () => Number, minimum: 0 }, bathrooms: { required: false, type: () => Number, minimum: 0 }, garage: { required: false, type: () => Boolean }, coveredArea: { required: false, type: () => Number, minimum: 0 }, totalArea: { required: false, type: () => Number, minimum: 0 }, propertyAge: { required: false, type: () => Number, minimum: 0 }, floorNumber: { required: false, type: () => Number }, status: { required: false, enum: require("../enums/property.enums").PropertyStatus }, assignedSellerId: { required: false, type: () => String, format: "uuid" }, images: { required: false, type: () => [require("./property-nested.dto").PropertyImageInputDto] }, amenityIds: { required: false, type: () => [Number] }, features: { required: false, type: () => [require("./property-nested.dto").PropertyFeatureInputDto] }, suitableForMortgageCredit: { required: false, type: () => Boolean }, availableServices: { required: false, enum: require("../enums/property.enums").AvailableService, isArray: true }, weHaveTheKey: { required: false, type: () => Boolean }, contact: { required: false, type: () => String, maxLength: 255 }, publicationLink: { required: false, type: () => String, maxLength: 2048 } };
    }
}
exports.CreatePropertyDto = CreatePropertyDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        maxLength: 255,
        example: 'Departamento 3 ambientes en Palermo',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreatePropertyDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePropertyDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: property_enums_1.PropertyOperationType }),
    (0, class_validator_1.IsEnum)(property_enums_1.PropertyOperationType),
    __metadata("design:type", String)
], CreatePropertyDto.prototype, "operationType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: property_enums_1.PropertyType }),
    (0, class_validator_1.IsEnum)(property_enums_1.PropertyType),
    __metadata("design:type", String)
], CreatePropertyDto.prototype, "propertyType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 185000.5 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreatePropertyDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: property_enums_1.Currency }),
    (0, class_validator_1.IsEnum)(property_enums_1.Currency),
    __metadata("design:type", String)
], CreatePropertyDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ maxLength: 255 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreatePropertyDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreatePropertyDto.prototype, "countryId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreatePropertyDto.prototype, "provinceId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreatePropertyDto.prototype, "cityId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreatePropertyDto.prototype, "neighborhoodId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: -34.603722 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsLatitude)(),
    __metadata("design:type", Number)
], CreatePropertyDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: -58.381592 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsLongitude)(),
    __metadata("design:type", Number)
], CreatePropertyDto.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreatePropertyDto.prototype, "rooms", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreatePropertyDto.prototype, "bedrooms", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreatePropertyDto.prototype, "bathrooms", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreatePropertyDto.prototype, "garage", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreatePropertyDto.prototype, "coveredArea", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({ maxDecimalPlaces: 2 }),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreatePropertyDto.prototype, "totalArea", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreatePropertyDto.prototype, "propertyAge", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreatePropertyDto.prototype, "floorNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: property_enums_1.PropertyStatus,
        default: property_enums_1.PropertyStatus.BORRADOR,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(property_enums_1.PropertyStatus),
    __metadata("design:type", String)
], CreatePropertyDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Solo ADMIN puede asignar otro vendedor',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreatePropertyDto.prototype, "assignedSellerId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [property_nested_dto_1.PropertyImageInputDto] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => property_nested_dto_1.PropertyImageInputDto),
    __metadata("design:type", Array)
], CreatePropertyDto.prototype, "images", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [Number], example: [1, 2, 3] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)({ each: true }),
    __metadata("design:type", Array)
], CreatePropertyDto.prototype, "amenityIds", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [property_nested_dto_1.PropertyFeatureInputDto] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => property_nested_dto_1.PropertyFeatureInputDto),
    __metadata("design:type", Array)
], CreatePropertyDto.prototype, "features", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreatePropertyDto.prototype, "suitableForMortgageCredit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: property_enums_1.AvailableService,
        isArray: true,
        example: ['agua', 'gas', 'pavimento'],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(property_enums_1.AvailableService, { each: true }),
    __metadata("design:type", Array)
], CreatePropertyDto.prototype, "availableServices", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreatePropertyDto.prototype, "weHaveTheKey", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '+54 9 351 1234567',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreatePropertyDto.prototype, "contact", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'https://www.zonaprop.com.ar/propiedad-123',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(2048),
    __metadata("design:type", String)
], CreatePropertyDto.prototype, "publicationLink", void 0);
//# sourceMappingURL=create-property.dto.js.map