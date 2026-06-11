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
exports.PropertiesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const swagger_constants_1 = require("../swagger/swagger.constants");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const authenticated_user_interface_1 = require("../common/interfaces/authenticated-user.interface");
const create_property_dto_1 = require("./dto/create-property.dto");
const property_response_dto_1 = require("./dto/property-response.dto");
const query_property_dto_1 = require("./dto/query-property.dto");
const update_property_dto_1 = require("./dto/update-property.dto");
const properties_service_1 = require("./properties.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const class_transformer_1 = require("class-transformer");
const uploads_constants_1 = require("../modules/uploads/utils/uploads.constants");
const uploads_service_1 = require("../modules/uploads/services/uploads.service");
let PropertiesController = class PropertiesController {
    propertiesService;
    uploadsService;
    constructor(propertiesService, uploadsService) {
        this.propertiesService = propertiesService;
        this.uploadsService = uploadsService;
    }
    async create(files, rawData, user, imagesMetadata) {
        let parsed;
        try {
            parsed = JSON.parse(rawData);
        }
        catch {
            throw new common_1.BadRequestException('Payload inválido');
        }
        const dto = (0, class_transformer_1.plainToInstance)(create_property_dto_1.CreatePropertyDto, parsed);
        const uploadedFiles = await this.uploadsService.uploadPropertyImages(files);
        const parsedMetadata = Array.isArray(imagesMetadata)
            ? imagesMetadata.map((item) => {
                const parsed = JSON.parse(item);
                return {
                    position: parsed.position,
                    isCover: parsed.isCover,
                };
            })
            : [];
        const images = uploadedFiles.map((file, index) => ({
            imageUrl: file.url,
            position: parsedMetadata[index]?.position ?? index,
            isCover: parsedMetadata[index]?.isCover ?? false,
        }));
        if (!images.some((img) => img.isCover) && images.length > 0) {
            images[0].isCover = true;
        }
        dto.images = images;
        return this.propertiesService.create(dto, user);
    }
    findAll(query, user) {
        return this.propertiesService.findAll(query, user);
    }
    findOne(id, user) {
        return this.propertiesService.findOne(id, user);
    }
    update(id, dto, user) {
        return this.propertiesService.update(id, dto, user);
    }
    remove(id, user) {
        return this.propertiesService.remove(id, user);
    }
};
exports.PropertiesController = PropertiesController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images', uploads_constants_1.MAX_FILES, {
        storage: (0, multer_1.memoryStorage)(),
        limits: {
            fileSize: uploads_constants_1.MAX_FILE_SIZE,
        },
    })),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiOperation)({
        summary: 'Crear propiedad',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        type: property_response_dto_1.PropertyResponseDto,
    }),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)('data')),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __param(3, (0, common_1.Body)('imagesMetadata')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String, authenticated_user_interface_1.AuthenticatedUser, Array]),
    __metadata("design:returntype", Promise)
], PropertiesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar propiedades',
        description: 'ADMIN ve todo. VENDEDOR ve publicadas + las propias/asignadas.',
    }),
    (0, swagger_1.ApiOkResponse)({ type: property_response_dto_1.PaginatedPropertyResponseDto }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_property_dto_1.QueryPropertyDto,
        authenticated_user_interface_1.AuthenticatedUser]),
    __metadata("design:returntype", void 0)
], PropertiesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener propiedad por ID' }),
    (0, swagger_1.ApiOkResponse)({ type: property_response_dto_1.PropertyResponseDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, authenticated_user_interface_1.AuthenticatedUser]),
    __metadata("design:returntype", void 0)
], PropertiesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Actualizar propiedad' }),
    (0, swagger_1.ApiOkResponse)({ type: property_response_dto_1.PropertyResponseDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_property_dto_1.UpdatePropertyDto,
        authenticated_user_interface_1.AuthenticatedUser]),
    __metadata("design:returntype", void 0)
], PropertiesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Eliminar propiedad (soft delete)' }),
    (0, swagger_1.ApiNoContentResponse)(),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, authenticated_user_interface_1.AuthenticatedUser]),
    __metadata("design:returntype", void 0)
], PropertiesController.prototype, "remove", null);
exports.PropertiesController = PropertiesController = __decorate([
    (0, swagger_1.ApiTags)('Propiedades'),
    (0, swagger_1.ApiBearerAuth)(swagger_constants_1.SWAGGER_ACCESS_TOKEN),
    (0, common_1.Controller)('properties'),
    __metadata("design:paramtypes", [properties_service_1.PropertiesService,
        uploads_service_1.UploadsService])
], PropertiesController);
//# sourceMappingURL=properties.controller.js.map