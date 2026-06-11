import { ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
import { UserRole } from '../users/enums/user-role.enum';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RefreshSessionMeta, TokenService } from './token.service';
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
export declare class AuthService {
    private readonly usersService;
    private readonly tokenService;
    private readonly config;
    private readonly usersRepo;
    constructor(usersService: UsersService, tokenService: TokenService, config: ConfigService, usersRepo: Repository<User>);
    register(dto: RegisterDto, requesterRole?: UserRole): Promise<AuthResponse & {
        refreshToken: string;
        refreshExpiresAt: Date;
    }>;
    login(dto: LoginDto, meta: RefreshSessionMeta): Promise<AuthResponse & {
        refreshToken: string;
        refreshExpiresAt: Date;
    }>;
    refresh(refreshToken: string, meta: RefreshSessionMeta): Promise<AuthResponse & {
        refreshToken: string;
        refreshExpiresAt: Date;
    }>;
    logout(refreshToken?: string): Promise<void>;
    logoutAll(userId: string): Promise<void>;
    getProfile(userId: string): Promise<User>;
    toSafeUser(user: User): SafeUser;
    private buildAuthResponse;
    private resolveRegistrationRole;
    private assertCanAuthenticate;
}
