import { RefreshToken } from '../../auth/entities/refresh-token.entity';
import { UserRole } from '../enums/user-role.enum';
export declare class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
    passwordHash: string;
    role: UserRole;
    isActive: boolean;
    isVerified: boolean;
    lastLoginAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    refreshTokens: RefreshToken[];
}
