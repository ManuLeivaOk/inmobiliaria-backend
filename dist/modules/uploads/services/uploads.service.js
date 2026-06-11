"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadsService = void 0;
const common_1 = require("@nestjs/common");
const fs = __importStar(require("fs/promises"));
const path = __importStar(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const uploads_constants_1 = require("../utils/uploads.constants");
const uploads_path_util_1 = require("../utils/uploads-path.util");
const file_name_util_1 = require("../utils/file-name.util");
let UploadsService = class UploadsService {
    async uploadPropertyImages(files) {
        if (!files?.length) {
            return [];
        }
        const uploadDir = (0, uploads_path_util_1.buildPropertyUploadPath)();
        (0, uploads_path_util_1.ensureDirectoryExists)(uploadDir);
        const uploadedFiles = [];
        for (const file of files) {
            this.validateFile(file);
            const fileName = (0, file_name_util_1.generateFileName)();
            const absolutePath = path.join(uploadDir, fileName);
            const image = (0, sharp_1.default)(file.buffer, {
                failOn: 'error',
            });
            const metadata = await image.metadata();
            const processedBuffer = await image
                .rotate()
                .resize({
                width: 1600,
                withoutEnlargement: true,
            })
                .webp({
                quality: 72,
                effort: 4,
            })
                .toBuffer();
            await fs.writeFile(absolutePath, processedBuffer);
            uploadedFiles.push({
                url: (0, uploads_path_util_1.toPublicUploadUrl)(absolutePath),
                width: metadata.width ?? 0,
                height: metadata.height ?? 0,
                size: processedBuffer.length,
            });
        }
        return uploadedFiles;
    }
    async deletePropertyImages(imageUrls) {
        if (!imageUrls.length) {
            return;
        }
        await Promise.all(imageUrls.map(async (imageUrl) => {
            try {
                const filePath = (0, uploads_path_util_1.resolvePropertyImagePath)(imageUrl);
                await fs.unlink(filePath);
            }
            catch (error) {
                if (error.code !== 'ENOENT') {
                    throw error;
                }
            }
        }));
    }
    validateFile(file) {
        if (!uploads_constants_1.ALLOWED_MIME_TYPES.includes(file.mimetype)) {
            throw new common_1.BadRequestException(`Formato inválido: ${file.mimetype}`);
        }
    }
};
exports.UploadsService = UploadsService;
exports.UploadsService = UploadsService = __decorate([
    (0, common_1.Injectable)()
], UploadsService);
//# sourceMappingURL=uploads.service.js.map