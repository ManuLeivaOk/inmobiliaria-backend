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
exports.PropertyFeatureInputDto = exports.PropertyImageInputDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class PropertyImageInputDto {
    imageUrl;
    position;
    isCover;
    static _OPENAPI_METADATA_FACTORY() {
        return { imageUrl: { required: true, type: () => String, format: "uri" }, position: { required: false, type: () => Number, minimum: 0 }, isCover: { required: false, type: () => Boolean } };
    }
}
exports.PropertyImageInputDto = PropertyImageInputDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://cdn.example.com/img1.jpg' }),
    (0, class_validator_1.IsUrl)({}, { message: 'imageUrl debe ser una URL válida' }),
    __metadata("design:type", String)
], PropertyImageInputDto.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: 0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], PropertyImageInputDto.prototype, "position", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ default: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], PropertyImageInputDto.prototype, "isCover", void 0);
class PropertyFeatureInputDto {
    featureKey;
    featureValue;
    static _OPENAPI_METADATA_FACTORY() {
        return { featureKey: { required: true, type: () => String, maxLength: 100 }, featureValue: { required: true, type: () => String } };
    }
}
exports.PropertyFeatureInputDto = PropertyFeatureInputDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'orientation' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], PropertyFeatureInputDto.prototype, "featureKey", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Norte' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PropertyFeatureInputDto.prototype, "featureValue", void 0);
//# sourceMappingURL=property-nested.dto.js.map