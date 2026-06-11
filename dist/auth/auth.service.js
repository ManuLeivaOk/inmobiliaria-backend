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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const user_entity_1 = require("../users/entities/user.entity");
const user_role_enum_1 = require("../users/enums/user-role.enum");
const users_service_1 = require("../users/users.service");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const token_service_1 = require("./token.service");
let AuthService = class AuthService {
    usersService;
    tokenService;
    config;
    usersRepo;
    constructor(usersService, tokenService, config, usersRepo) {
        this.usersService = usersService;
        this.tokenService = tokenService;
        this.config = config;
        this.usersRepo = usersRepo;
    }
    async register(dto, requesterRole) {
        const role = await this.resolveRegistrationRole(dto.role, requesterRole);
        const user = await this.usersService.create({
            firstName: dto.firstName,
            lastName: dto.lastName,
            email: dto.email,
            phone: dto.phone,
            password: dto.password,
            role,
        });
        const tokens = await this.tokenService.issueTokenPair(user);
        return {
            ...this.buildAuthResponse(tokens, user),
            refreshToken: tokens.refreshToken,
            refreshExpiresAt: tokens.refreshTokenExpiresAt,
        };
    }
    async login(dto, meta) {
        const user = await this.usersService.findByEmailWithPassword(dto.email.toLowerCase());
        if (!user) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        await this.assertCanAuthenticate(user);
        const valid = await this.usersService.verifyPassword(user, dto.password);
        if (!valid) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        await this.usersService.updateLastLogin(user.id);
        const tokens = await this.tokenService.issueTokenPair(user, meta);
        return {
            ...this.buildAuthResponse(tokens, user),
            refreshToken: tokens.refreshToken,
            refreshExpiresAt: tokens.refreshTokenExpiresAt,
        };
    }
    async refresh(refreshToken, meta) {
        const { tokens, user } = await this.tokenService.rotateRefreshToken(refreshToken, meta);
        return {
            ...this.buildAuthResponse(tokens, user),
            refreshToken: tokens.refreshToken,
            refreshExpiresAt: tokens.refreshTokenExpiresAt,
        };
    }
    async logout(refreshToken) {
        if (refreshToken) {
            await this.tokenService.revokeRefreshToken(refreshToken);
        }
    }
    async logoutAll(userId) {
        await this.tokenService.revokeAllUserSessions(userId);
    }
    getProfile(userId) {
        return this.usersService.getProfile(userId);
    }
    toSafeUser(user) {
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            role: user.role,
            isVerified: user.isVerified,
        };
    }
    buildAuthResponse(tokens, user) {
        return {
            accessToken: tokens.accessToken,
            expiresIn: this.config.get('jwt.accessExpiresIn') ?? '15m',
            tokenType: 'Bearer',
            user: this.toSafeUser(user),
        };
    }
    async resolveRegistrationRole(requestedRole, requesterRole) {
        const totalUsers = await this.usersRepo.count();
        if (totalUsers === 0) {
            return user_role_enum_1.UserRole.ADMIN;
        }
        if (!requestedRole || requestedRole === user_role_enum_1.UserRole.VENDEDOR) {
            return user_role_enum_1.UserRole.VENDEDOR;
        }
        if (requestedRole === user_role_enum_1.UserRole.ADMIN && requesterRole === user_role_enum_1.UserRole.ADMIN) {
            return user_role_enum_1.UserRole.ADMIN;
        }
        throw new common_1.ForbiddenException('Solo un administrador puede crear cuentas ADMIN');
    }
    async assertCanAuthenticate(user) {
        if (!user.isActive) {
            throw new common_1.ForbiddenException('La cuenta está desactivada');
        }
        if (user.deletedAt) {
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        }
        const requireVerified = this.config.get('auth.requireEmailVerified') === true;
        if (requireVerified && !user.isVerified) {
            throw new common_1.ForbiddenException('Debés verificar tu email antes de iniciar sesión');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(3, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        token_service_1.TokenService,
        config_1.ConfigService,
        typeorm_2.Repository])
], AuthService);
//# sourceMappingURL=auth.service.js.map