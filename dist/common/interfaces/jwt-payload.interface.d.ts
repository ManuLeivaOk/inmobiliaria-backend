import { UserRole } from '../../users/enums/user-role.enum';
export interface AccessTokenPayload {
    sub: string;
    email: string;
    role: UserRole;
    type: 'access';
}
export interface RefreshTokenJwtPayload {
    sub: string;
    jti: string;
    familyId: string;
    type: 'refresh';
}
