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
exports.UploadsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const swagger_1 = require("@nestjs/swagger");
const uploads_service_1 = require("../services/uploads.service");
const uploads_constants_1 = require("../utils/uploads.constants");
let UploadsController = class UploadsController {
    uploadsService;
    constructor(uploadsService) {
        this.uploadsService = uploadsService;
    }
    async uploadPropertyImages(files) {
        if (!files?.length) {
            throw new common_1.BadRequestException('Debés enviar al menos una imagen');
        }
        return this.uploadsService.uploadPropertyImages(files);
    }
};
exports.UploadsController = UploadsController;
__decorate([
    (0, common_1.Post)('properties'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', uploads_constants_1.MAX_FILES, {
        storage: (0, multer_1.memoryStorage)(),
        limits: {
            fileSize: uploads_constants_1.MAX_FILE_SIZE,
        },
    })),
    openapi.ApiResponse({ status: 201, type: [require("../dto/upload-response.dto").UploadedFileResponseDto] }),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], UploadsController.prototype, "uploadPropertyImages", null);
exports.UploadsController = UploadsController = __decorate([
    (0, swagger_1.ApiTags)('Uploads'),
    (0, common_1.Controller)('uploads'),
    __metadata("design:paramtypes", [uploads_service_1.UploadsService])
], UploadsController);
//# sourceMappingURL=uploads.controller.js.map