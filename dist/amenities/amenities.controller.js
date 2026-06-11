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
exports.AmenitiesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const swagger_constants_1 = require("../swagger/swagger.constants");
const user_role_enum_1 = require("../users/enums/user-role.enum");
const amenities_service_1 = require("./amenities.service");
class CreateAmenityDto {
    name;
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Piscina' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateAmenityDto.prototype, "name", void 0);
class AmenityDto {
    id;
    name;
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AmenityDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AmenityDto.prototype, "name", void 0);
let AmenitiesController = class AmenitiesController {
    amenitiesService;
    constructor(amenitiesService) {
        this.amenitiesService = amenitiesService;
    }
    findAll() {
        return this.amenitiesService.findAll();
    }
    create(dto) {
        return this.amenitiesService.create(dto.name);
    }
    remove(id) {
        return this.amenitiesService.remove(id.toString());
    }
};
exports.AmenitiesController = AmenitiesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar amenities disponibles' }),
    (0, swagger_1.ApiOkResponse)({ type: [AmenityDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AmenitiesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Crear amenity (ADMIN)' }),
    (0, swagger_1.ApiCreatedResponse)({ type: AmenityDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateAmenityDto]),
    __metadata("design:returntype", void 0)
], AmenitiesController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar amenity (ADMIN)' }),
    (0, swagger_1.ApiNoContentResponse)(),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AmenitiesController.prototype, "remove", null);
exports.AmenitiesController = AmenitiesController = __decorate([
    (0, swagger_1.ApiTags)('Amenities'),
    (0, swagger_1.ApiBearerAuth)(swagger_constants_1.SWAGGER_ACCESS_TOKEN),
    (0, common_1.Controller)('amenities'),
    __metadata("design:paramtypes", [amenities_service_1.AmenitiesService])
], AmenitiesController);
//# sourceMappingURL=amenities.controller.js.map