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
exports.RefreshToken = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
let RefreshToken = class RefreshToken {
    id;
    userId;
    user;
    tokenHash;
    familyId;
    expiresAt;
    revokedAt;
    replacedByTokenId;
    userAgent;
    ipAddress;
    createdAt;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => String }, userId: { required: true, type: () => String }, user: { required: true, type: () => require("../../users/entities/user.entity").User }, tokenHash: { required: true, type: () => String }, familyId: { required: true, type: () => String }, expiresAt: { required: true, type: () => Date }, revokedAt: { required: true, type: () => Date, nullable: true }, replacedByTokenId: { required: true, type: () => String, nullable: true }, userAgent: { required: true, type: () => String, nullable: true }, ipAddress: { required: true, type: () => String, nullable: true }, createdAt: { required: true, type: () => Date } };
    }
};
exports.RefreshToken = RefreshToken;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], RefreshToken.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id', type: 'uuid' }),
    __metadata("design:type", String)
], RefreshToken.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.refreshTokens, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], RefreshToken.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'token_hash', type: 'text' }),
    __metadata("design:type", String)
], RefreshToken.prototype, "tokenHash", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'family_id', type: 'uuid' }),
    __metadata("design:type", String)
], RefreshToken.prototype, "familyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expires_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], RefreshToken.prototype, "expiresAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'revoked_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Object)
], RefreshToken.prototype, "revokedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'replaced_by_token_id', type: 'uuid', nullable: true }),
    __metadata("design:type", Object)
], RefreshToken.prototype, "replacedByTokenId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_agent', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], RefreshToken.prototype, "userAgent", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ip_address', type: 'varchar', length: 45, nullable: true }),
    __metadata("design:type", Object)
], RefreshToken.prototype, "ipAddress", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamp' }),
    __metadata("design:type", Date)
], RefreshToken.prototype, "createdAt", void 0);
exports.RefreshToken = RefreshToken = __decorate([
    (0, typeorm_1.Entity)({ name: 'refresh_tokens' }),
    (0, typeorm_1.Index)(['userId', 'familyId']),
    (0, typeorm_1.Index)(['tokenHash'], { unique: true })
], RefreshToken);
//# sourceMappingURL=refresh-token.entity.js.map