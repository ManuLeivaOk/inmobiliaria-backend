import { User } from '../../users/entities/user.entity';
export declare class RefreshToken {
    id: string;
    userId: string;
    user: User;
    tokenHash: string;
    familyId: string;
    expiresAt: Date;
    revokedAt: Date | null;
    replacedByTokenId: string | null;
    userAgent: string | null;
    ipAddress: string | null;
    createdAt: Date;
}
