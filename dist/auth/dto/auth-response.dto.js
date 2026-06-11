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
exports.AuthResponseDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const safe_user_dto_1 = require("./safe-user.dto");
class AuthResponseDto {
    accessToken;
    expiresIn;
    tokenType;
    user;
    static _OPENAPI_METADATA_FACTORY() {
        return { accessToken: { required: true, type: () => String }, expiresIn: { required: true, type: () => String }, tokenType: { required: true, type: () => String }, user: { required: true, type: () => require("./safe-user.dto").SafeUserDto } };
    }
}
exports.AuthResponseDto = AuthResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'JWT de acceso. Enviar como Bearer en rutas protegidas.',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    }),
    __metadata("design:type", String)
], AuthResponseDto.prototype, "accessToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '15m' }),
    __metadata("design:type", String)
], AuthResponseDto.prototype, "expiresIn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bearer', enum: ['Bearer'] }),
    __metadata("design:type", String)
], AuthResponseDto.prototype, "tokenType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: safe_user_dto_1.SafeUserDto }),
    __metadata("design:type", safe_user_dto_1.SafeUserDto)
], AuthResponseDto.prototype, "user", void 0);
//# sourceMappingURL=auth-response.dto.js.map