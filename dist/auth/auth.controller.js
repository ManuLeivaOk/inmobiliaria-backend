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
exports.AuthController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
const throttler_1 = require("@nestjs/throttler");
const crypto_1 = require("crypto");
const api_error_dto_1 = require("../common/dto/api-error.dto");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const public_decorator_1 = require("../common/decorators/public.decorator");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const optional_jwt_auth_guard_1 = require("../common/guards/optional-jwt-auth.guard");
const authenticated_user_interface_1 = require("../common/interfaces/authenticated-user.interface");
const swagger_constants_1 = require("../swagger/swagger.constants");
const user_role_enum_1 = require("../users/enums/user-role.enum");
const auth_service_1 = require("./auth.service");
const admin_ping_response_dto_1 = require("./dto/admin-ping-response.dto");
const auth_response_dto_1 = require("./dto/auth-response.dto");
const login_dto_1 = require("./dto/login.dto");
const register_dto_1 = require("./dto/register.dto");
const safe_user_dto_1 = require("./dto/safe-user.dto");
const REGISTER_API_KEY_HEADER = 'x-register-api-key';
let AuthController = class AuthController {
    authService;
    config;
    constructor(authService, config) {
        this.authService = authService;
        this.config = config;
    }
    async register(dto, res, registerApiKey, requester) {
        this.assertValidRegisterApiKey(registerApiKey);
        const result = await this.authService.register(dto, requester?.role);
        this.setRefreshCookie(res, result.refreshToken, result.refreshExpiresAt);
        const { refreshToken: _rt, refreshExpiresAt: _re, ...body } = result;
        return body;
    }
    async login(dto, req, res) {
        const result = await this.authService.login(dto, this.extractMeta(req));
        this.setRefreshCookie(res, result.refreshToken, result.refreshExpiresAt);
        const { refreshToken: _rt, refreshExpiresAt: _re, ...body } = result;
        return body;
    }
    async refresh(req, res) {
        const refreshToken = this.getRefreshTokenFromRequest(req);
        if (!refreshToken) {
            this.clearRefreshCookie(res);
            throw new common_1.UnauthorizedException('Refresh token no presente');
        }
        try {
            const result = await this.authService.refresh(refreshToken, this.extractMeta(req));
            this.setRefreshCookie(res, result.refreshToken, result.refreshExpiresAt);
            const { refreshToken: _rt, refreshExpiresAt: _re, ...body } = result;
            return body;
        }
        catch (error) {
            this.clearRefreshCookie(res);
            throw error;
        }
    }
    clearSession(res) {
        this.clearRefreshCookie(res);
    }
    async logout(req, res) {
        const refreshToken = this.getRefreshTokenFromRequest(req);
        await this.authService.logout(refreshToken);
        this.clearRefreshCookie(res);
    }
    async logoutAll(user) {
        await this.authService.logoutAll(user.id);
    }
    async me(user) {
        const profile = await this.authService.getProfile(user.id);
        return this.authService.toSafeUser(profile);
    }
    adminPing() {
        return { ok: true, scope: 'admin' };
    }
    assertValidRegisterApiKey(providedApiKey) {
        const expectedApiKey = this.config.get('auth.registerApiKey');
        if (!expectedApiKey || !providedApiKey) {
            throw new common_1.ForbiddenException('No tenés permisos para registrar usuarios');
        }
        const expectedBuffer = Buffer.from(expectedApiKey);
        const providedBuffer = Buffer.from(providedApiKey);
        if (expectedBuffer.length !== providedBuffer.length ||
            !(0, crypto_1.timingSafeEqual)(expectedBuffer, providedBuffer)) {
            throw new common_1.ForbiddenException('No tenés permisos para registrar usuarios');
        }
    }
    setRefreshCookie(res, token, expiresAt) {
        const cookieName = this.config.get('auth.refreshCookieName');
        const secure = this.config.get('auth.cookieSecure');
        const sameSite = this.config.get('auth.cookieSameSite');
        const domain = this.config.get('auth.cookieDomain');
        const isProduction = this.config.get('nodeEnv') === 'production';
        res.cookie(cookieName ?? swagger_constants_1.SWAGGER_REFRESH_COOKIE, token, {
            httpOnly: true,
            secure: secure ?? isProduction,
            sameSite: sameSite ?? 'strict',
            expires: expiresAt,
            path: '/',
            ...(domain && domain !== 'localhost' ? { domain } : {}),
        });
    }
    clearRefreshCookie(res) {
        const cookieName = this.config.get('auth.refreshCookieName');
        const secure = this.config.get('auth.cookieSecure');
        const sameSite = this.config.get('auth.cookieSameSite');
        const domain = this.config.get('auth.cookieDomain');
        const isProduction = this.config.get('nodeEnv') === 'production';
        res.clearCookie(cookieName ?? swagger_constants_1.SWAGGER_REFRESH_COOKIE, {
            httpOnly: true,
            secure: secure ?? isProduction,
            sameSite: sameSite ?? 'strict',
            path: '/',
            ...(domain && domain !== 'localhost' ? { domain } : {}),
        });
    }
    getRefreshTokenFromRequest(req) {
        const cookieName = this.config.get('auth.refreshCookieName');
        const cookies = req.cookies;
        return cookies?.[cookieName ?? swagger_constants_1.SWAGGER_REFRESH_COOKIE];
    }
    extractMeta(req) {
        return {
            userAgent: req.headers['user-agent'],
            ipAddress: this.resolveClientIp(req),
        };
    }
    resolveClientIp(req) {
        const forwarded = req.headers['x-forwarded-for'];
        if (typeof forwarded === 'string') {
            return forwarded.split(',')[0]?.trim();
        }
        return req.ip;
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.UseGuards)(optional_jwt_auth_guard_1.OptionalJwtAuthGuard),
    (0, throttler_1.Throttle)({ default: { limit: 5, ttl: 60_000 } }),
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({
        summary: 'Registrar usuario',
        description: 'Crea una cuenta. El primer usuario del sistema recibe rol ADMIN. ' +
            'Setea la cookie de refresh automáticamente. ' +
            'Requiere header X-Register-Api-Key. ' +
            'Opcional: Bearer de un ADMIN para crear cuentas con rol ADMIN.',
    }),
    (0, swagger_1.ApiHeader)({
        name: REGISTER_API_KEY_HEADER,
        required: true,
        description: 'API key privada para habilitar altas de usuarios',
    }),
    (0, swagger_1.ApiBearerAuth)(swagger_constants_1.SWAGGER_ACCESS_TOKEN),
    (0, swagger_1.ApiCreatedResponse)({
        type: auth_response_dto_1.AuthResponseDto,
        description: 'Usuario creado. Refresh token en cookie httpOnly.',
    }),
    (0, swagger_1.ApiConflictResponse)({
        type: api_error_dto_1.ApiErrorDto,
        description: 'Email ya registrado',
    }),
    (0, swagger_1.ApiForbiddenResponse)({
        type: api_error_dto_1.ApiErrorDto,
        description: 'Intento de crear ADMIN sin permisos',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __param(2, (0, common_1.Headers)(REGISTER_API_KEY_HEADER)),
    __param(3, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto, Object, Object, authenticated_user_interface_1.AuthenticatedUser]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, throttler_1.Throttle)({ default: { limit: 10, ttl: 60_000 } }),
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Iniciar sesión',
        description: 'Valida credenciales y devuelve access token en el body. ' +
            'El refresh token se envía en cookie `refresh_token` (httpOnly).',
    }),
    (0, swagger_1.ApiOkResponse)({
        type: auth_response_dto_1.AuthResponseDto,
        description: 'Login exitoso',
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        type: api_error_dto_1.ApiErrorDto,
        description: 'Credenciales inválidas',
    }),
    (0, swagger_1.ApiForbiddenResponse)({
        type: api_error_dto_1.ApiErrorDto,
        description: 'Cuenta desactivada o email no verificado',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, throttler_1.Throttle)({ default: { limit: 20, ttl: 60_000 } }),
    (0, common_1.Post)('refresh'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Renovar tokens',
        description: 'Rota el refresh token (cookie) y emite un nuevo par access/refresh. ' +
            'Requiere la cookie de sesión previa. En Swagger, autorizá la cookie refresh_token.',
    }),
    (0, swagger_1.ApiCookieAuth)(swagger_constants_1.SWAGGER_REFRESH_COOKIE),
    (0, swagger_1.ApiOkResponse)({
        type: auth_response_dto_1.AuthResponseDto,
        description: 'Tokens renovados',
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        type: api_error_dto_1.ApiErrorDto,
        description: 'Cookie ausente, expirada o reutilización detectada',
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('clear-session'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({
        summary: 'Limpiar cookie de sesión',
        description: 'Elimina la cookie refresh sin requerir autenticación. Útil cuando el refresh es inválido.',
    }),
    (0, swagger_1.ApiNoContentResponse)({ description: 'Cookie eliminada' }),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "clearSession", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiBearerAuth)(swagger_constants_1.SWAGGER_ACCESS_TOKEN),
    (0, swagger_1.ApiCookieAuth)(swagger_constants_1.SWAGGER_REFRESH_COOKIE),
    (0, swagger_1.ApiOperation)({
        summary: 'Cerrar sesión actual',
        description: 'Revoca el refresh token de la cookie y la elimina.',
    }),
    (0, swagger_1.ApiNoContentResponse)({ description: 'Sesión cerrada' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ type: api_error_dto_1.ApiErrorDto }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('logout-all'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiBearerAuth)(swagger_constants_1.SWAGGER_ACCESS_TOKEN),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.VENDEDOR),
    (0, swagger_1.ApiOperation)({
        summary: 'Cerrar todas las sesiones',
        description: 'Revoca todos los refresh tokens del usuario autenticado.',
    }),
    (0, swagger_1.ApiNoContentResponse)({ description: 'Todas las sesiones revocadas' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ type: api_error_dto_1.ApiErrorDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [authenticated_user_interface_1.AuthenticatedUser]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logoutAll", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, swagger_1.ApiBearerAuth)(swagger_constants_1.SWAGGER_ACCESS_TOKEN),
    (0, swagger_1.ApiOperation)({ summary: 'Perfil del usuario autenticado' }),
    (0, swagger_1.ApiOkResponse)({ type: safe_user_dto_1.SafeUserDto }),
    (0, swagger_1.ApiUnauthorizedResponse)({ type: api_error_dto_1.ApiErrorDto }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [authenticated_user_interface_1.AuthenticatedUser]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "me", null);
__decorate([
    (0, common_1.Get)('admin/ping'),
    (0, swagger_1.ApiBearerAuth)(swagger_constants_1.SWAGGER_ACCESS_TOKEN),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Health check de rol ADMIN',
        description: 'Endpoint de prueba. Solo accesible con rol ADMIN.',
    }),
    (0, swagger_1.ApiOkResponse)({ type: admin_ping_response_dto_1.AdminPingResponseDto }),
    (0, swagger_1.ApiUnauthorizedResponse)({ type: api_error_dto_1.ApiErrorDto }),
    (0, swagger_1.ApiForbiddenResponse)({
        type: api_error_dto_1.ApiErrorDto,
        description: 'El usuario no tiene rol ADMIN',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "adminPing", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Autenticación'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        config_1.ConfigService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map