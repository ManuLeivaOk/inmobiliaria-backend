import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { RefreshToken } from './entities/refresh-token.entity';
export interface TokenPair {
    accessToken: string;
    refreshToken: string;
    refreshTokenExpiresAt: Date;
}
export interface RefreshSessionMeta {
    userAgent?: string;
    ipAddress?: string;
}
export declare class TokenService {
    private readonly jwtService;
    private readonly config;
    private readonly refreshTokenRepo;
    constructor(jwtService: JwtService, config: ConfigService, refreshTokenRepo: Repository<RefreshToken>);
    issueTokenPair(user: User, meta?: RefreshSessionMeta): Promise<TokenPair>;
    rotateRefreshToken(presentedToken: string, meta?: RefreshSessionMeta): Promise<{
        tokens: TokenPair;
        user: User;
    }>;
    revokeRefreshToken(presentedToken: string): Promise<void>;
    revokeAllUserSessions(userId: string): Promise<void>;
    private signAccessToken;
    private persistRefreshToken;
    private computeRefreshExpiry;
    private parseDurationToMs;
    private revokeToken;
    private revokeTokenFamily;
}
