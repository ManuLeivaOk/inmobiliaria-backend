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
exports.SafeUserDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const user_role_enum_1 = require("../../users/enums/user-role.enum");
class SafeUserDto {
    id;
    firstName;
    lastName;
    email;
    phone;
    role;
    isVerified;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, firstName: { required: true, type: () => String }, lastName: { required: true, type: () => String }, email: { required: true, type: () => String }, phone: { required: true, type: () => String, nullable: true }, role: { required: true, enum: require("../../users/enums/user-role.enum").UserRole }, isVerified: { required: true, type: () => Boolean } };
    }
}
exports.SafeUserDto = SafeUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({ format: 'uuid', example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' }),
    __metadata("design:type", String)
], SafeUserDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'María' }),
    __metadata("design:type", String)
], SafeUserDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'González' }),
    __metadata("design:type", String)
], SafeUserDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'maria@inmobiliaria.com' }),
    __metadata("design:type", String)
], SafeUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '+5491112345678', nullable: true }),
    __metadata("design:type", Object)
], SafeUserDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: user_role_enum_1.UserRole, example: user_role_enum_1.UserRole.VENDEDOR }),
    __metadata("design:type", String)
], SafeUserDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], SafeUserDto.prototype, "isVerified", void 0);
//# sourceMappingURL=safe-user.dto.js.map