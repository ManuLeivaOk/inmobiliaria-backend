import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
import { UserRole } from '../users/enums/user-role.enum';
import { UsersService } from '../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshSessionMeta, TokenPair, TokenService } from './token.service';

export interface AuthResponse {
  accessToken: string;
  expiresIn: string;
  tokenType: 'Bearer';
  user: SafeUser;
}

export interface SafeUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  role: UserRole;
  isVerified: boolean;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
    private readonly config: ConfigService,
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async register(
    dto: RegisterDto,
    requesterRole?: UserRole,
  ): Promise<AuthResponse & { refreshToken: string; refreshExpiresAt: Date }> {
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

  async login(
    dto: LoginDto,
    meta: RefreshSessionMeta,
  ): Promise<AuthResponse & { refreshToken: string; refreshExpiresAt: Date }> {
    const user = await this.usersService.findByEmailWithPassword(
      dto.email.toLowerCase(),
    );

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    await this.assertCanAuthenticate(user);

    const valid = await this.usersService.verifyPassword(user, dto.password);
    if (!valid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    await this.usersService.updateLastLogin(user.id);

    const tokens = await this.tokenService.issueTokenPair(user, meta);

    return {
      ...this.buildAuthResponse(tokens, user),
      refreshToken: tokens.refreshToken,
      refreshExpiresAt: tokens.refreshTokenExpiresAt,
    };
  }

  async refresh(
    refreshToken: string,
    meta: RefreshSessionMeta,
  ): Promise<AuthResponse & { refreshToken: string; refreshExpiresAt: Date }> {
    const { tokens, user } = await this.tokenService.rotateRefreshToken(
      refreshToken,
      meta,
    );

    return {
      ...this.buildAuthResponse(tokens, user),
      refreshToken: tokens.refreshToken,
      refreshExpiresAt: tokens.refreshTokenExpiresAt,
    };
  }

  async logout(refreshToken?: string): Promise<void> {
    if (refreshToken) {
      await this.tokenService.revokeRefreshToken(refreshToken);
    }
  }

  async logoutAll(userId: string): Promise<void> {
    await this.tokenService.revokeAllUserSessions(userId);
  }

  getProfile(userId: string): Promise<User> {
    return this.usersService.getProfile(userId);
  }

  toSafeUser(user: User): SafeUser {
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

  private buildAuthResponse(tokens: TokenPair, user: User): AuthResponse {
    return {
      accessToken: tokens.accessToken,
      expiresIn: this.config.get<string>('jwt.accessExpiresIn') ?? '15m',
      tokenType: 'Bearer',
      user: this.toSafeUser(user),
    };
  }

  private async resolveRegistrationRole(
    requestedRole: UserRole | undefined,
    requesterRole?: UserRole,
  ): Promise<UserRole> {
    const totalUsers = await this.usersRepo.count();
    if (totalUsers === 0) {
      return UserRole.ADMIN;
    }

    if (!requestedRole || requestedRole === UserRole.VENDEDOR) {
      return UserRole.VENDEDOR;
    }

    if (requestedRole === UserRole.ADMIN && requesterRole === UserRole.ADMIN) {
      return UserRole.ADMIN;
    }

    throw new ForbiddenException(
      'Solo un administrador puede crear cuentas ADMIN',
    );
  }

  private async assertCanAuthenticate(user: User): Promise<void> {
    if (!user.isActive) {
      throw new ForbiddenException('La cuenta está desactivada');
    }

    if (user.deletedAt) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const requireVerified =
      this.config.get<boolean>('auth.requireEmailVerified') === true;

    if (requireVerified && !user.isVerified) {
      throw new ForbiddenException(
        'Debés verificar tu email antes de iniciar sesión',
      );
    }
  }
}
