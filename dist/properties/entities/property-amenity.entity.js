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
exports.PropertyAmenity = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const amenity_entity_1 = require("../../amenities/entities/amenity.entity");
const property_entity_1 = require("./property.entity");
let PropertyAmenity = class PropertyAmenity {
    propertyId;
    amenityId;
    property;
    amenity;
    static _OPENAPI_METADATA_FACTORY() {
        return { propertyId: { required: true, type: () => String }, amenityId: { required: true, type: () => String }, property: { required: true, type: () => require("./property.entity").Property }, amenity: { required: true, type: () => require("../../amenities/entities/amenity.entity").Amenity } };
    }
};
exports.PropertyAmenity = PropertyAmenity;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'property_id', type: 'uuid' }),
    __metadata("design:type", String)
], PropertyAmenity.prototype, "propertyId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'amenity_id', type: 'bigint' }),
    __metadata("design:type", String)
], PropertyAmenity.prototype, "amenityId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => property_entity_1.Property, (property) => property.propertyAmenities, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'property_id' }),
    __metadata("design:type", property_entity_1.Property)
], PropertyAmenity.prototype, "property", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => amenity_entity_1.Amenity, { onDelete: 'CASCADE', eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'amenity_id' }),
    __metadata("design:type", amenity_entity_1.Amenity)
], PropertyAmenity.prototype, "amenity", void 0);
exports.PropertyAmenity = PropertyAmenity = __decorate([
    (0, typeorm_1.Entity)({ name: 'property_amenities' })
], PropertyAmenity);
//# sourceMappingURL=property-amenity.entity.js.map