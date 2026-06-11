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
exports.RegisterDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const user_role_enum_1 = require("../../users/enums/user-role.enum");
class RegisterDto {
    firstName;
    lastName;
    email;
    phone;
    password;
    role;
    static _OPENAPI_METADATA_FACTORY() {
        return { firstName: { required: true, type: () => String, maxLength: 100 }, lastName: { required: true, type: () => String, maxLength: 100 }, email: { required: true, type: () => String, format: "email" }, phone: { required: false, type: () => String, maxLength: 50 }, password: { required: true, type: () => String, minLength: 12 }, role: { required: false, enum: require("../../users/enums/user-role.enum").UserRole } };
    }
}
exports.RegisterDto = RegisterDto;
__decorate([
    (0, swagger_1.ApiProperty)({ maxLength: 100, example: 'Juan' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], RegisterDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ maxLength: 100, example: 'Pérez' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], RegisterDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'juan.perez@inmobiliaria.com' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ maxLength: 50, example: '+5491198765432' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], RegisterDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        minLength: 12,
        example: 'ContraseñaSegura123!',
        format: 'password',
        description: 'Mínimo 12 caracteres',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(12, {
        message: 'La contraseña debe tener al menos 12 caracteres',
    }),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: user_role_enum_1.UserRole,
        description: 'Solo un ADMIN autenticado puede crear usuarios ADMIN. Por defecto: VENDEDOR.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(user_role_enum_1.UserRole),
    __metadata("design:type", String)
], RegisterDto.prototype, "role", void 0);
//# sourceMappingURL=register.dto.js.map