import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiHeader,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Throttle } from '@nestjs/throttler';
import { timingSafeEqual } from 'crypto';
import type { Request, Response } from 'express';
import { ApiErrorDto } from '../common/dto/api-error.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Public } from '../common/decorators/public.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { OptionalJwtAuthGuard } from '../common/guards/optional-jwt-auth.guard';
import { AuthenticatedUser } from '../common/interfaces/authenticated-user.interface';
import {
  SWAGGER_ACCESS_TOKEN,
  SWAGGER_REFRESH_COOKIE,
} from '../swagger/swagger.constants';
import { UserRole } from '../users/enums/user-role.enum';
import { AuthService } from './auth.service';
import { AdminPingResponseDto } from './dto/admin-ping-response.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { SafeUserDto } from './dto/safe-user.dto';
import { RefreshSessionMeta } from './token.service';

const REGISTER_API_KEY_HEADER = 'x-register-api-key';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService,
  ) {}

  @Public()
  @UseGuards(OptionalJwtAuthGuard)
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @Post('register')
  @ApiOperation({
    summary: 'Registrar usuario',
    description:
      'Crea una cuenta. El primer usuario del sistema recibe rol ADMIN. ' +
      'Setea la cookie de refresh automáticamente. ' +
      'Requiere header X-Register-Api-Key. ' +
      'Opcional: Bearer de un ADMIN para crear cuentas con rol ADMIN.',
  })
  @ApiHeader({
    name: REGISTER_API_KEY_HEADER,
    required: true,
    description: 'API key privada para habilitar altas de usuarios',
  })
  @ApiBearerAuth(SWAGGER_ACCESS_TOKEN)
  @ApiCreatedResponse({
    type: AuthResponseDto,
    description: 'Usuario creado. Refresh token en cookie httpOnly.',
  })
  @ApiConflictResponse({
    type: ApiErrorDto,
    description: 'Email ya registrado',
  })
  @ApiForbiddenResponse({
    type: ApiErrorDto,
    description: 'Intento de crear ADMIN sin permisos',
  })
  async register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
    @Headers(REGISTER_API_KEY_HEADER) registerApiKey: string | undefined,
    @CurrentUser() requester?: AuthenticatedUser,
  ) {
    this.assertValidRegisterApiKey(registerApiKey);

    const result = await this.authService.register(dto, requester?.role);

    this.setRefreshCookie(res, result.refreshToken, result.refreshExpiresAt);

    const { refreshToken: _rt, refreshExpiresAt: _re, ...body } = result;
    return body;
  }

  @Public()
  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Iniciar sesión',
    description:
      'Valida credenciales y devuelve access token en el body. ' +
      'El refresh token se envía en cookie `refresh_token` (httpOnly).',
  })
  @ApiOkResponse({
    type: AuthResponseDto,
    description: 'Login exitoso',
  })
  @ApiUnauthorizedResponse({
    type: ApiErrorDto,
    description: 'Credenciales inválidas',
  })
  @ApiForbiddenResponse({
    type: ApiErrorDto,
    description: 'Cuenta desactivada o email no verificado',
  })
  async login(
    @Body() dto: LoginDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(dto, this.extractMeta(req));

    this.setRefreshCookie(res, result.refreshToken, result.refreshExpiresAt);

    const { refreshToken: _rt, refreshExpiresAt: _re, ...body } = result;
    return body;
  }

  @Public()
  @Throttle({ default: { limit: 20, ttl: 60_000 } })
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Renovar tokens',
    description:
      'Rota el refresh token (cookie) y emite un nuevo par access/refresh. ' +
      'Requiere la cookie de sesión previa. En Swagger, autorizá la cookie refresh_token.',
  })
  @ApiCookieAuth(SWAGGER_REFRESH_COOKIE)
  @ApiOkResponse({
    type: AuthResponseDto,
    description: 'Tokens renovados',
  })
  @ApiUnauthorizedResponse({
    type: ApiErrorDto,
    description: 'Cookie ausente, expirada o reutilización detectada',
  })
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = this.getRefreshTokenFromRequest(req);

    if (!refreshToken) {
      this.clearRefreshCookie(res);
      throw new UnauthorizedException('Refresh token no presente');
    }

    try {
      const result = await this.authService.refresh(
        refreshToken,
        this.extractMeta(req),
      );

      this.setRefreshCookie(res, result.refreshToken, result.refreshExpiresAt);

      const { refreshToken: _rt, refreshExpiresAt: _re, ...body } = result;
      return body;
    } catch (error) {
      this.clearRefreshCookie(res);
      throw error;
    }
  }

  @Public()
  @Post('clear-session')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Limpiar cookie de sesión',
    description:
      'Elimina la cookie refresh sin requerir autenticación. Útil cuando el refresh es inválido.',
  })
  @ApiNoContentResponse({ description: 'Cookie eliminada' })
  clearSession(@Res({ passthrough: true }) res: Response) {
    this.clearRefreshCookie(res);
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth(SWAGGER_ACCESS_TOKEN)
  @ApiCookieAuth(SWAGGER_REFRESH_COOKIE)
  @ApiOperation({
    summary: 'Cerrar sesión actual',
    description: 'Revoca el refresh token de la cookie y la elimina.',
  })
  @ApiNoContentResponse({ description: 'Sesión cerrada' })
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = this.getRefreshTokenFromRequest(req);
    await this.authService.logout(refreshToken);
    this.clearRefreshCookie(res);
  }

  @Post('logout-all')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth(SWAGGER_ACCESS_TOKEN)
  @Roles(UserRole.ADMIN, UserRole.VENDEDOR)
  @ApiOperation({
    summary: 'Cerrar todas las sesiones',
    description: 'Revoca todos los refresh tokens del usuario autenticado.',
  })
  @ApiNoContentResponse({ description: 'Todas las sesiones revocadas' })
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  async logoutAll(@CurrentUser() user: AuthenticatedUser) {
    await this.authService.logoutAll(user.id);
  }

  @Get('me')
  @ApiBearerAuth(SWAGGER_ACCESS_TOKEN)
  @ApiOperation({ summary: 'Perfil del usuario autenticado' })
  @ApiOkResponse({ type: SafeUserDto })
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  async me(@CurrentUser() user: AuthenticatedUser) {
    const profile = await this.authService.getProfile(user.id);
    return this.authService.toSafeUser(profile);
  }

  @Get('admin/ping')
  @ApiBearerAuth(SWAGGER_ACCESS_TOKEN)
  @Roles(UserRole.ADMIN)
  @ApiOperation({
    summary: 'Health check de rol ADMIN',
    description: 'Endpoint de prueba. Solo accesible con rol ADMIN.',
  })
  @ApiOkResponse({ type: AdminPingResponseDto })
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  @ApiForbiddenResponse({
    type: ApiErrorDto,
    description: 'El usuario no tiene rol ADMIN',
  })
  adminPing() {
    return { ok: true, scope: 'admin' };
  }

  private assertValidRegisterApiKey(providedApiKey?: string): void {
    const expectedApiKey = this.config.get<string>('auth.registerApiKey');
    console.log('providedApiKey', providedApiKey, expectedApiKey);
    if (!expectedApiKey || !providedApiKey) {
      throw new ForbiddenException('No tenés permisos para registrar usuarios');
    }

    const expectedBuffer = Buffer.from(expectedApiKey);
    const providedBuffer = Buffer.from(providedApiKey);

    if (
      expectedBuffer.length !== providedBuffer.length ||
      !timingSafeEqual(expectedBuffer, providedBuffer)
    ) {
      throw new ForbiddenException('No tenés permisos para registrar usuarios');
    }
  }

  private setRefreshCookie(
    res: Response,
    token: string,
    expiresAt: Date,
  ): void {
    const cookieName = this.config.get<string>('auth.refreshCookieName');
    const secure = this.config.get<boolean>('auth.cookieSecure');
    const sameSite = this.config.get<'strict' | 'lax' | 'none'>(
      'auth.cookieSameSite',
    );
    const domain = this.config.get<string>('auth.cookieDomain');
    const isProduction = this.config.get<string>('nodeEnv') === 'production';

    res.cookie(cookieName ?? SWAGGER_REFRESH_COOKIE, token, {
      httpOnly: true,
      secure: secure ?? isProduction,
      sameSite: sameSite ?? 'strict',
      expires: expiresAt,
      path: '/',
      ...(domain && domain !== 'localhost' ? { domain } : {}),
    });
  }

  private clearRefreshCookie(res: Response): void {
    const cookieName = this.config.get<string>('auth.refreshCookieName');
    const secure = this.config.get<boolean>('auth.cookieSecure');
    const sameSite = this.config.get<'strict' | 'lax' | 'none'>(
      'auth.cookieSameSite',
    );
    const domain = this.config.get<string>('auth.cookieDomain');
    const isProduction = this.config.get<string>('nodeEnv') === 'production';

    res.clearCookie(cookieName ?? SWAGGER_REFRESH_COOKIE, {
      httpOnly: true,
      secure: secure ?? isProduction,
      sameSite: sameSite ?? 'strict',
      path: '/',
      ...(domain && domain !== 'localhost' ? { domain } : {}),
    });
  }

  private getRefreshTokenFromRequest(req: Request): string | undefined {
    const cookieName = this.config.get<string>('auth.refreshCookieName');
    const cookies = req.cookies as Record<string, string> | undefined;
    return cookies?.[cookieName ?? SWAGGER_REFRESH_COOKIE];
  }

  private extractMeta(req: Request): RefreshSessionMeta {
    return {
      userAgent: req.headers['user-agent'],
      ipAddress: this.resolveClientIp(req),
    };
  }

  private resolveClientIp(req: Request): string | undefined {
    const forwarded = req.headers['x-forwarded-for'];
    if (typeof forwarded === 'string') {
      return forwarded.split(',')[0]?.trim();
    }
    return req.ip;
  }
}
