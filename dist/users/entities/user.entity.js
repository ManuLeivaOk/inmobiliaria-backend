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
exports.User = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const refresh_token_entity_1 = require("../../auth/entities/refresh-token.entity");
const user_role_enum_1 = require("../enums/user-role.enum");
let User = class User {
    id;
    firstName;
    lastName;
    email;
    phone;
    passwordHash;
    role;
    isActive;
    isVerified;
    lastLoginAt;
    createdAt;
    updatedAt;
    deletedAt;
    refreshTokens;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, firstName: { required: true, type: () => String }, lastName: { required: true, type: () => String }, email: { required: true, type: () => String }, phone: { required: true, type: () => String, nullable: true }, passwordHash: { required: true, type: () => String }, role: { required: true, enum: require("../enums/user-role.enum").UserRole }, isActive: { required: true, type: () => Boolean }, isVerified: { required: true, type: () => Boolean }, lastLoginAt: { required: true, type: () => Date, nullable: true }, createdAt: { required: true, type: () => Date }, updatedAt: { required: true, type: () => Date }, deletedAt: { required: true, type: () => Date, nullable: true }, refreshTokens: { required: true, type: () => [require("../../auth/entities/refresh-token.entity").RefreshToken] } };
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'first_name', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'last_name', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'password_hash', type: 'text', select: false }),
    __metadata("design:type", String)
], User.prototype, "passwordHash", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: user_role_enum_1.UserRole,
        enumName: 'user_role_enum',
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_active', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_verified', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'last_login_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "lastLoginAt", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => refresh_token_entity_1.RefreshToken, (token) => token.user),
    __metadata("design:type", Array)
], User.prototype, "refreshTokens", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)({ name: 'users' })
], User);
//# sourceMappingURL=user.entity.js.map