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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureDirectoryExists = ensureDirectoryExists;
exports.buildPropertyUploadPath = buildPropertyUploadPath;
exports.resolvePropertyImagePath = resolvePropertyImagePath;
exports.toPublicUploadUrl = toPublicUploadUrl;
const common_1 = require("@nestjs/common");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const uploads_constants_1 = require("./uploads.constants");
function ensureDirectoryExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}
function buildPropertyUploadPath() {
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    return path.join(process.cwd(), uploads_constants_1.PROPERTY_UPLOADS_PATH, year, month);
}
function resolvePropertyImagePath(imageUrl) {
    const normalized = imageUrl.replace(/\\/g, '/');
    if (!normalized.startsWith('/uploads/properties/')) {
        throw new common_1.BadRequestException('URL de imagen inválida');
    }
    const relativePath = normalized.replace(/^\//, '');
    const absolutePath = path.resolve(process.cwd(), relativePath);
    const uploadsRoot = path.resolve(process.cwd(), uploads_constants_1.PROPERTY_UPLOADS_PATH);
    if (!absolutePath.startsWith(`${uploadsRoot}${path.sep}`) &&
        absolutePath !== uploadsRoot) {
        throw new common_1.BadRequestException('URL de imagen inválida');
    }
    return absolutePath;
}
function toPublicUploadUrl(absolutePath) {
    return absolutePath
        .replace(process.cwd(), '')
        .replace(/\\/g, '/');
}
//# sourceMappingURL=uploads-path.util.js.map