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
exports.ApiErrorDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
class ApiErrorDto {
    statusCode;
    message;
    error;
    static _OPENAPI_METADATA_FACTORY() {
        return { statusCode: { required: true, type: () => Number }, message: { required: true, type: () => Object }, error: { required: false, type: () => String } };
    }
}
exports.ApiErrorDto = ApiErrorDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 401 }),
    __metadata("design:type", Number)
], ApiErrorDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        oneOf: [
            { type: 'string', example: 'Credenciales inválidas' },
            {
                type: 'array',
                items: { type: 'string' },
                example: ['email must be an email'],
            },
        ],
    }),
    __metadata("design:type", Object)
], ApiErrorDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Unauthorized', required: false }),
    __metadata("design:type", String)
], ApiErrorDto.prototype, "error", void 0);
//# sourceMappingURL=api-error.dto.js.map