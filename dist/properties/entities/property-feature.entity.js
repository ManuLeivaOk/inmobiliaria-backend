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
exports.PropertyFeature = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const property_entity_1 = require("./property.entity");
let PropertyFeature = class PropertyFeature {
    id;
    propertyId;
    property;
    featureKey;
    featureValue;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, propertyId: { required: true, type: () => String }, property: { required: true, type: () => require("./property.entity").Property }, featureKey: { required: true, type: () => String }, featureValue: { required: true, type: () => String } };
    }
};
exports.PropertyFeature = PropertyFeature;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'bigint' }),
    __metadata("design:type", String)
], PropertyFeature.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'property_id', type: 'uuid' }),
    __metadata("design:type", String)
], PropertyFeature.prototype, "propertyId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => property_entity_1.Property, (property) => property.features, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'property_id' }),
    __metadata("design:type", property_entity_1.Property)
], PropertyFeature.prototype, "property", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'feature_key', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], PropertyFeature.prototype, "featureKey", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'feature_value', type: 'text' }),
    __metadata("design:type", String)
], PropertyFeature.prototype, "featureValue", void 0);
exports.PropertyFeature = PropertyFeature = __decorate([
    (0, typeorm_1.Entity)({ name: 'property_features' })
], PropertyFeature);
//# sourceMappingURL=property-feature.entity.js.map