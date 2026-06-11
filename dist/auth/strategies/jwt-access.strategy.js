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
exports.JwtAccessStrategy = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const auth_constants_1 = require("../auth.constants");
const users_service_1 = require("../../users/users.service");
let JwtAccessStrategy = class JwtAccessStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, auth_constants_1.ACCESS_TOKEN_STRATEGY) {
    usersService;
    constructor(config, usersService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.getOrThrow('jwt.accessSecret'),
            issuer: config.get('jwt.issuer'),
            audience: config.get('jwt.audience'),
        });
        this.usersService = usersService;
    }
    async validate(payload) {
        if (payload.type !== 'access') {
            throw new common_1.UnauthorizedException('Token inválido');
        }
        const user = await this.usersService.findActiveById(payload.sub);
        if (!user) {
            throw new common_1.UnauthorizedException('Usuario no encontrado');
        }
        return {
            id: user.id,
            email: user.email,
            role: user.role,
        };
    }
};
exports.JwtAccessStrategy = JwtAccessStrategy;
exports.JwtAccessStrategy = JwtAccessStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        users_service_1.UsersService])
], JwtAccessStrategy);
//# sourceMappingURL=jwt-access.strategy.js.map