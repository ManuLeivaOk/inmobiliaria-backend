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
exports.validateEnv = validateEnv;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class EnvironmentVariables {
    NODE_ENV;
    PORT;
    DB_HOST;
    DB_PORT;
    DB_USERNAME;
    DB_PASSWORD;
    DB_NAME;
    DB_SSL;
    DB_SYNCHRONIZE;
    DB_DROP_SCHEMA;
    DB_SEED;
    JWT_ACCESS_SECRET;
    JWT_REFRESH_SECRET;
    JWT_ACCESS_EXPIRES_IN;
    JWT_REFRESH_EXPIRES_IN;
    JWT_ISSUER;
    JWT_AUDIENCE;
    PASSWORD_PEPPER;
    REGISTER_API_KEY;
    REFRESH_COOKIE_NAME;
    COOKIE_SECURE;
    COOKIE_SAME_SITE;
    COOKIE_DOMAIN;
    CORS_ORIGIN;
    REQUIRE_EMAIL_VERIFIED;
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['development', 'production', 'test']),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "NODE_ENV", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "PORT", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "DB_HOST", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "DB_PORT", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "DB_USERNAME", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "DB_PASSWORD", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "DB_NAME", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBooleanString)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "DB_SSL", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBooleanString)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "DB_SYNCHRONIZE", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBooleanString)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "DB_DROP_SCHEMA", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBooleanString)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "DB_SEED", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(32),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "JWT_ACCESS_SECRET", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(32),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "JWT_REFRESH_SECRET", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "JWT_ACCESS_EXPIRES_IN", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "JWT_REFRESH_EXPIRES_IN", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "JWT_ISSUER", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "JWT_AUDIENCE", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "PASSWORD_PEPPER", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MinLength)(32),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "REGISTER_API_KEY", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "REFRESH_COOKIE_NAME", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBooleanString)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "COOKIE_SECURE", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['strict', 'lax', 'none']),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "COOKIE_SAME_SITE", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "COOKIE_DOMAIN", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "CORS_ORIGIN", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBooleanString)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "REQUIRE_EMAIL_VERIFIED", void 0);
function validateEnv(config) {
    const validated = (0, class_transformer_1.plainToInstance)(EnvironmentVariables, config, {
        enableImplicitConversion: true,
    });
    const errors = (0, class_validator_1.validateSync)(validated, {
        skipMissingProperties: false,
    });
    if (errors.length > 0) {
        throw new Error(`Variables de entorno inválidas:\n${errors
            .map((e) => Object.values(e.constraints ?? {}).join(', '))
            .join('\n')}`);
    }
    if (validated.JWT_ACCESS_SECRET &&
        validated.JWT_REFRESH_SECRET &&
        validated.JWT_ACCESS_SECRET === validated.JWT_REFRESH_SECRET) {
        throw new Error('Variables de entorno inválidas:\nJWT_ACCESS_SECRET y JWT_REFRESH_SECRET deben ser distintos');
    }
    return validated;
}
//# sourceMappingURL=env.validation.js.map