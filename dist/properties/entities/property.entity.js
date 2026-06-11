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
exports.Property = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const city_entity_1 = require("../../geo/entities/city.entity");
const country_entity_1 = require("../../geo/entities/country.entity");
const neighborhood_entity_1 = require("../../geo/entities/neighborhood.entity");
const province_entity_1 = require("../../geo/entities/province.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const property_enums_1 = require("../enums/property.enums");
const property_amenity_entity_1 = require("./property-amenity.entity");
const property_feature_entity_1 = require("./property-feature.entity");
const property_image_entity_1 = require("./property-image.entity");
let Property = class Property {
    id;
    title;
    description;
    operationType;
    propertyType;
    price;
    currency;
    address;
    countryId;
    country;
    provinceId;
    province;
    cityId;
    city;
    neighborhoodId;
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
    assignedSellerId;
    assignedSeller;
    createdById;
    createdBy;
    createdAt;
    updatedAt;
    deletedAt;
    images;
    propertyAmenities;
    features;
    suitableForMortgageCredit;
    availableServices;
    weHaveTheKey;
    contact;
    publicationLink;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, title: { required: true, type: () => String }, description: { required: true, type: () => String, nullable: true }, operationType: { required: true, enum: require("../enums/property.enums").PropertyOperationType }, propertyType: { required: true, enum: require("../enums/property.enums").PropertyType }, price: { required: true, type: () => String }, currency: { required: true, enum: require("../enums/property.enums").Currency }, address: { required: true, type: () => String, nullable: true }, countryId: { required: true, type: () => String, nullable: true }, country: { required: true, type: () => require("../../geo/entities/country.entity").Country, nullable: true }, provinceId: { required: true, type: () => String, nullable: true }, province: { required: true, type: () => require("../../geo/entities/province.entity").Province, nullable: true }, cityId: { required: true, type: () => String, nullable: true }, city: { required: true, type: () => require("../../geo/entities/city.entity").City, nullable: true }, neighborhoodId: { required: true, type: () => String, nullable: true }, neighborhood: { required: true, type: () => require("../../geo/entities/neighborhood.entity").Neighborhood, nullable: true }, latitude: { required: true, type: () => String, nullable: true }, longitude: { required: true, type: () => String, nullable: true }, rooms: { required: true, type: () => Number, nullable: true }, bedrooms: { required: true, type: () => Number, nullable: true }, bathrooms: { required: true, type: () => Number, nullable: true }, garage: { required: true, type: () => Boolean }, coveredArea: { required: true, type: () => String, nullable: true }, totalArea: { required: true, type: () => String, nullable: true }, propertyAge: { required: true, type: () => Number, nullable: true }, floorNumber: { required: true, type: () => Number, nullable: true }, status: { required: true, enum: require("../enums/property.enums").PropertyStatus }, publishedAt: { required: true, type: () => Date, nullable: true }, assignedSellerId: { required: true, type: () => String, nullable: true }, assignedSeller: { required: true, type: () => require("../../users/entities/user.entity").User, nullable: true }, createdById: { required: true, type: () => String }, createdBy: { required: true, type: () => require("../../users/entities/user.entity").User }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, deletedAt: { required: true, type: () => Date, nullable: true }, images: { required: true, type: () => [require("./property-image.entity").PropertyImage] }, propertyAmenities: { required: true, type: () => [require("./property-amenity.entity").PropertyAmenity] }, features: { required: true, type: () => [require("./property-feature.entity").PropertyFeature] }, suitableForMortgageCredit: { required: true, type: () => Boolean }, availableServices: { required: true, nullable: true, enum: require("../enums/property.enums").AvailableService, isArray: true }, weHaveTheKey: { required: true, type: () => Boolean }, contact: { required: true, type: () => String, nullable: true }, publicationLink: { required: true, type: () => String, nullable: true } };
    }
};
exports.Property = Property;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Property.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Property.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], Property.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'operation_type',
        type: 'enum',
        enum: property_enums_1.PropertyOperationType,
        enumName: 'property_operation_enum',
    }),
    __metadata("design:type", String)
], Property.prototype, "operationType", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'property_type',
        type: 'enum',
        enum: property_enums_1.PropertyType,
        enumName: 'property_type_enum',
    }),
    __metadata("design:type", String)
], Property.prototype, "propertyType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 14, scale: 2 }),
    __metadata("design:type", String)
], Property.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: property_enums_1.Currency,
        enumName: 'currency_enum',
    }),
    __metadata("design:type", String)
], Property.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], Property.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'country_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], Property.prototype, "countryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => country_entity_1.Country, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'country_id' }),
    __metadata("design:type", Object)
], Property.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'province_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], Property.prototype, "provinceId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => province_entity_1.Province, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'province_id' }),
    __metadata("design:type", Object)
], Property.prototype, "province", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'city_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], Property.prototype, "cityId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => city_entity_1.City, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'city_id' }),
    __metadata("design:type", Object)
], Property.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'neighborhood_id', type: 'bigint', nullable: true }),
    __metadata("design:type", Object)
], Property.prototype, "neighborhoodId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => neighborhood_entity_1.Neighborhood, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'neighborhood_id' }),
    __metadata("design:type", Object)
], Property.prototype, "neighborhood", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 7,
        nullable: true,
    }),
    __metadata("design:type", Object)
], Property.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 7,
        nullable: true,
    }),
    __metadata("design:type", Object)
], Property.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'smallint', nullable: true }),
    __metadata("design:type", Object)
], Property.prototype, "rooms", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'smallint', nullable: true }),
    __metadata("design:type", Object)
], Property.prototype, "bedrooms", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'smallint', nullable: true }),
    __metadata("design:type", Object)
], Property.prototype, "bathrooms", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Property.prototype, "garage", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'covered_area',
        type: 'numeric',
        precision: 10,
        scale: 2,
        nullable: true,
    }),
    __metadata("design:type", Object)
], Property.prototype, "coveredArea", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'total_area',
        type: 'numeric',
        precision: 10,
        scale: 2,
        nullable: true,
    }),
    __metadata("design:type", Object)
], Property.prototype, "totalArea", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'property_age', type: 'smallint', nullable: true }),
    __metadata("design:type", Object)
], Property.prototype, "propertyAge", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'floor_number', type: 'smallint', nullable: true }),
    __metadata("design:type", Object)
], Property.prototype, "floorNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: property_enums_1.PropertyStatus,
        enumName: 'property_status_enum',
        default: property_enums_1.PropertyStatus.BORRADOR,
    }),
    __metadata("design:type", String)
], Property.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'published_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], Property.prototype, "publishedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'assigned_seller_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], Property.prototype, "assignedSellerId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'assigned_seller_id' }),
    __metadata("design:type", Object)
], Property.prototype, "assignedSeller", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'created_by', type: 'uuid' }),
    __metadata("design:type", String)
], Property.prototype, "createdById", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", user_entity_1.User)
], Property.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], Property.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], Property.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], Property.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => property_image_entity_1.PropertyImage, (image) => image.property, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Property.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => property_amenity_entity_1.PropertyAmenity, (pa) => pa.property, { cascade: true }),
    __metadata("design:type", Array)
], Property.prototype, "propertyAmenities", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => property_feature_entity_1.PropertyFeature, (feature) => feature.property, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Property.prototype, "features", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'suitable_for_mortgage_credit',
        type: 'boolean',
        default: false,
    }),
    __metadata("design:type", Boolean)
], Property.prototype, "suitableForMortgageCredit", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'available_services',
        type: 'enum',
        enum: property_enums_1.AvailableService,
        enumName: 'available_service_enum',
        array: true,
        nullable: true,
    }),
    __metadata("design:type", Object)
], Property.prototype, "availableServices", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'we_have_the_key',
        type: 'boolean',
        default: false,
    }),
    __metadata("design:type", Boolean)
], Property.prototype, "weHaveTheKey", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", Object)
], Property.prototype, "contact", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'publication_link',
        type: 'text',
        nullable: true,
    }),
    __metadata("design:type", Object)
], Property.prototype, "publicationLink", void 0);
exports.Property = Property = __decorate([
    (0, typeorm_1.Entity)({ name: 'properties' })
], Property);
//# sourceMappingURL=property.entity.js.map