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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeoController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const swagger_constants_1 = require("../swagger/swagger.constants");
const geo_service_1 = require("./geo.service");
class GeoItemDto {
    id;
    name;
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], GeoItemDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], GeoItemDto.prototype, "name", void 0);
class GeoQueryDto {
    countryId;
    provinceId;
    cityId;
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], GeoQueryDto.prototype, "countryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], GeoQueryDto.prototype, "provinceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], GeoQueryDto.prototype, "cityId", void 0);
let GeoController = class GeoController {
    geoService;
    constructor(geoService) {
        this.geoService = geoService;
    }
    countries() {
        return this.geoService.findCountries();
    }
    provinces(countryId) {
        return this.geoService.findProvinces(countryId);
    }
    cities(provinceId) {
        return this.geoService.findCities(provinceId);
    }
    neighborhoods(cityId) {
        return this.geoService.findNeighborhoods(cityId);
    }
};
exports.GeoController = GeoController;
__decorate([
    (0, common_1.Get)('countries'),
    (0, swagger_1.ApiOperation)({ summary: 'Listar países' }),
    (0, swagger_1.ApiOkResponse)({ type: [GeoItemDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GeoController.prototype, "countries", null);
__decorate([
    (0, common_1.Get)('provinces'),
    (0, swagger_1.ApiOperation)({ summary: 'Listar provincias' }),
    (0, swagger_1.ApiQuery)({ name: 'countryId', required: false, type: Number }),
    (0, swagger_1.ApiOkResponse)({ type: [GeoItemDto] }),
    __param(0, (0, common_1.Query)('countryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GeoController.prototype, "provinces", null);
__decorate([
    (0, common_1.Get)('cities'),
    (0, swagger_1.ApiOperation)({ summary: 'Listar ciudades' }),
    (0, swagger_1.ApiQuery)({ name: 'provinceId', required: false, type: Number }),
    (0, swagger_1.ApiOkResponse)({ type: [GeoItemDto] }),
    __param(0, (0, common_1.Query)('provinceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GeoController.prototype, "cities", null);
__decorate([
    (0, common_1.Get)('neighborhoods'),
    (0, swagger_1.ApiOperation)({ summary: 'Listar barrios' }),
    (0, swagger_1.ApiQuery)({ name: 'cityId', required: false, type: Number }),
    (0, swagger_1.ApiOkResponse)({ type: [GeoItemDto] }),
    __param(0, (0, common_1.Query)('cityId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GeoController.prototype, "neighborhoods", null);
exports.GeoController = GeoController = __decorate([
    (0, swagger_1.ApiTags)('Geografía'),
    (0, swagger_1.ApiBearerAuth)(swagger_constants_1.SWAGGER_ACCESS_TOKEN),
    (0, common_1.Controller)('geo'),
    __metadata("design:paramtypes", [geo_service_1.GeoService])
], GeoController);
//# sourceMappingURL=geo.controller.js.map