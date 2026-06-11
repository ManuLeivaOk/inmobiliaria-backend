import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { AccessTokenPayload } from '../common/interfaces/jwt-payload.interface';
import { User } from '../users/entities/user.entity';
import { RefreshToken } from './entities/refresh-token.entity';
import { generateOpaqueToken, hashToken } from './utils/crypto.util';

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  refreshTokenExpiresAt: Date;
}

export interface RefreshSessionMeta {
  userAgent?: string;
  ipAddress?: string;
}

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepo: Repository<RefreshToken>,
  ) {}

  async issueTokenPair(
    user: User,
    meta: RefreshSessionMeta = {},
  ): Promise<TokenPair> {
    const familyId = randomUUID();
    const accessToken = await this.signAccessToken(user);
    const { rawToken, expiresAt } = await this.persistRefreshToken(
      user,
      familyId,
      meta,
    );

    return {
      accessToken,
      refreshToken: rawToken,
      refreshTokenExpiresAt: expiresAt,
    };
  }

  async rotateRefreshToken(
    presentedToken: string,
    meta: RefreshSessionMeta = {},
  ): Promise<{ tokens: TokenPair; user: User }> {
    const tokenHash = hashToken(presentedToken);
    const stored = await this.refreshTokenRepo.findOne({
      where: { tokenHash },
      relations: { user: true },
    });

    if (!stored) {
      throw new UnauthorizedException('Sesión inválida');
    }

    if (stored.revokedAt) {
      await this.revokeTokenFamily(stored.familyId);
      throw new UnauthorizedException(
        'Reutilización de token detectada. Todas las sesiones fueron cerradas.',
      );
    }

    if (stored.expiresAt < new Date()) {
      await this.revokeToken(stored.id);
      throw new UnauthorizedException('La sesión expiró');
    }

    const user = stored.user;

    if (!user.isActive || user.deletedAt) {
      throw new UnauthorizedException('Cuenta deshabilitada');
    }

    stored.revokedAt = new Date();
    await this.refreshTokenRepo.save(stored);

    const accessToken = await this.signAccessToken(user);
    const { rawToken, expiresAt, entity } = await this.persistRefreshToken(
      user,
      stored.familyId,
      meta,
    );

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

  async revokeRefreshToken(presentedToken: string): Promise<void> {
    const tokenHash = hashToken(presentedToken);
    const stored = await this.refreshTokenRepo.findOne({
      where: { tokenHash },
    });

    if (stored && !stored.revokedAt) {
      await this.revokeToken(stored.id);
    }
  }

  async revokeAllUserSessions(userId: string): Promise<void> {
    await this.refreshTokenRepo
      .createQueryBuilder()
      .update(RefreshToken)
      .set({ revokedAt: new Date() })
      .where('user_id = :userId', { userId })
      .andWhere('revoked_at IS NULL')
      .execute();
  }

  private async signAccessToken(user: User): Promise<string> {
    const payload: AccessTokenPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
      type: 'access',
    };

    const expiresIn =
      this.config.get<string>('jwt.accessExpiresIn') ?? '15m';

    return this.jwtService.signAsync(payload, {
      secret: this.config.getOrThrow<string>('jwt.accessSecret'),
      expiresIn: expiresIn as `${number}${'s' | 'm' | 'h' | 'd'}`,
      issuer: this.config.get<string>('jwt.issuer'),
      audience: this.config.get<string>('jwt.audience'),
    });
  }

  private async persistRefreshToken(
    user: User,
    familyId: string,
    meta: RefreshSessionMeta,
  ): Promise<{ rawToken: string; expiresAt: Date; entity: RefreshToken }> {
    const rawToken = generateOpaqueToken();
    const expiresAt = this.computeRefreshExpiry();

    const entity = this.refreshTokenRepo.create({
      userId: user.id,
      tokenHash: hashToken(rawToken),
      familyId,
      expiresAt,
      userAgent: meta.userAgent ?? null,
      ipAddress: meta.ipAddress ?? null,
    });

    await this.refreshTokenRepo.save(entity);

    return { rawToken, expiresAt, entity };
  }

  private computeRefreshExpiry(): Date {
    const expiresIn = this.config.get<string>('jwt.refreshExpiresIn') ?? '7d';
    const ms = this.parseDurationToMs(expiresIn);
    return new Date(Date.now() + ms);
  }

  private parseDurationToMs(duration: string): number {
    const match = /^(\d+)([smhd])$/.exec(duration.trim());
    if (!match) {
      return 7 * 24 * 60 * 60 * 1000;
    }

    const value = parseInt(match[1], 10);
    const unit = match[2];

    const multipliers: Record<string, number> = {
      s: 1000,
      m: 60 * 1000,
      h: 60 * 60 * 1000,
      d: 24 * 60 * 60 * 1000,
    };

    return value * (multipliers[unit] ?? multipliers.d);
  }

  private async revokeToken(id: string): Promise<void> {
    await this.refreshTokenRepo.update(id, { revokedAt: new Date() });
  }

  private async revokeTokenFamily(familyId: string): Promise<void> {
    await this.refreshTokenRepo.update(
      { familyId },
      { revokedAt: new Date() },
    );
  }
}
