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
exports.PropertyImage = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const property_entity_1 = require("./property.entity");
let PropertyImage = class PropertyImage {
    id;
    propertyId;
    property;
    imageUrl;
    position;
    isCover;
    createdAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, propertyId: { required: true, type: () => String }, property: { required: true, type: () => require("./property.entity").Property }, imageUrl: { required: true, type: () => String }, position: { required: true, type: () => Number }, isCover: { required: true, type: () => Boolean }, createdAt: { required: true, type: () => Date } };
    }
};
exports.PropertyImage = PropertyImage;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PropertyImage.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'property_id', type: 'uuid' }),
    __metadata("design:type", String)
], PropertyImage.prototype, "propertyId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => property_entity_1.Property, (property) => property.images, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'property_id' }),
    __metadata("design:type", property_entity_1.Property)
], PropertyImage.prototype, "property", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'image_url', type: 'text' }),
    __metadata("design:type", String)
], PropertyImage.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], PropertyImage.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_cover', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], PropertyImage.prototype, "isCover", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], PropertyImage.prototype, "createdAt", void 0);
exports.PropertyImage = PropertyImage = __decorate([
    (0, typeorm_1.Entity)({ name: 'property_images' })
], PropertyImage);
//# sourceMappingURL=property-image.entity.js.map