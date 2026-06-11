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
exports.TokenService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const crypto_1 = require("crypto");
const typeorm_2 = require("typeorm");
const refresh_token_entity_1 = require("./entities/refresh-token.entity");
const crypto_util_1 = require("./utils/crypto.util");
let TokenService = class TokenService {
    jwtService;
    config;
    refreshTokenRepo;
    constructor(jwtService, config, refreshTokenRepo) {
        this.jwtService = jwtService;
        this.config = config;
        this.refreshTokenRepo = refreshTokenRepo;
    }
    async issueTokenPair(user, meta = {}) {
        const familyId = (0, crypto_1.randomUUID)();
        const accessToken = await this.signAccessToken(user);
        const { rawToken, expiresAt } = await this.persistRefreshToken(user, familyId, meta);
        return {
            accessToken,
            refreshToken: rawToken,
            refreshTokenExpiresAt: expiresAt,
        };
    }
    async rotateRefreshToken(presentedToken, meta = {}) {
        const tokenHash = (0, crypto_util_1.hashToken)(presentedToken);
        const stored = await this.refreshTokenRepo.findOne({
            where: { tokenHash },
            relations: { user: true },
        });
        if (!stored) {
            throw new common_1.UnauthorizedException('Sesión inválida');
        }
        if (stored.revokedAt) {
            await this.revokeTokenFamily(stored.familyId);
            throw new common_1.UnauthorizedException('Reutilización de token detectada. Todas las sesiones fueron cerradas.');
        }
        if (stored.expiresAt < new Date()) {
            await this.revokeToken(stored.id);
            throw new common_1.UnauthorizedException('La sesión expiró');
        }
        const user = stored.user;
        if (!user.isActive || user.deletedAt) {
            throw new common_1.UnauthorizedException('Cuenta deshabilitada');
        }
        stored.revokedAt = new Date();
        await this.refreshTokenRepo.save(stored);
        const accessToken = await this.signAccessToken(user);
        const { rawToken, expiresAt, entity } = await this.persistRefreshToken(user, stored.familyId, meta);
        stored.replacedByTokenId = entity.id;
        await this.refreshTokenRepo.save(stored);
        return {
            user,
            tokens: {
                accessToken,
                refreshToken: rawToken,
                refreshTokenExpiresAt: expiresAt,
            },
        };
    }
    async revokeRefreshToken(presentedToken) {
        const tokenHash = (0, crypto_util_1.hashToken)(presentedToken);
        const stored = await this.refreshTokenRepo.findOne({
            where: { tokenHash },
        });
        if (stored && !stored.revokedAt) {
            await this.revokeToken(stored.id);
        }
    }
    async revokeAllUserSessions(userId) {
        await this.refreshTokenRepo
            .createQueryBuilder()
            .update(refresh_token_entity_1.RefreshToken)
            .set({ revokedAt: new Date() })
            .where('user_id = :userId', { userId })
            .andWhere('revoked_at IS NULL')
            .execute();
    }
    async signAccessToken(user) {
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
            type: 'access',
        };
        const expiresIn = this.config.get('jwt.accessExpiresIn') ?? '15m';
        return this.jwtService.signAsync(payload, {
            secret: this.config.getOrThrow('jwt.accessSecret'),
            expiresIn: expiresIn,
            issuer: this.config.get('jwt.issuer'),
            audience: this.config.get('jwt.audience'),
        });
    }
    async persistRefreshToken(user, familyId, meta) {
        const rawToken = (0, crypto_util_1.generateOpaqueToken)();
        const expiresAt = this.computeRefreshExpiry();
        const entity = this.refreshTokenRepo.create({
            userId: user.id,
            tokenHash: (0, crypto_util_1.hashToken)(rawToken),
            familyId,
            expiresAt,
            userAgent: meta.userAgent ?? null,
            ipAddress: meta.ipAddress ?? null,
        });
        await this.refreshTokenRepo.save(entity);
        return { rawToken, expiresAt, entity };
    }
    computeRefreshExpiry() {
        const expiresIn = this.config.get('jwt.refreshExpiresIn') ?? '7d';
        const ms = this.parseDurationToMs(expiresIn);
        return new Date(Date.now() + ms);
    }
    parseDurationToMs(duration) {
        const match = /^(\d+)([smhd])$/.exec(duration.trim());
        if (!match) {
            return 7 * 24 * 60 * 60 * 1000;
        }
        const value = parseInt(match[1], 10);
        const unit = match[2];
        const multipliers = {
            s: 1000,
            m: 60 * 1000,
            h: 60 * 60 * 1000,
            d: 24 * 60 * 60 * 1000,
        };
        return value * (multipliers[unit] ?? multipliers.d);
    }
    async revokeToken(id) {
        await this.refreshTokenRepo.update(id, { revokedAt: new Date() });
    }
    async revokeTokenFamily(familyId) {
        await this.refreshTokenRepo.update({ familyId }, { revokedAt: new Date() });
    }
};
exports.TokenService = TokenService;
exports.TokenService = TokenService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(refresh_token_entity_1.RefreshToken)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        typeorm_2.Repository])
], TokenService);
//# sourceMappingURL=token.service.js.map