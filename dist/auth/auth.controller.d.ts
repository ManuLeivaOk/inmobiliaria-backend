import { ConfigService } from '@nestjs/config';
import type { Request, Response } from 'express';
import { AuthenticatedUser } from '../common/interfaces/authenticated-user.interface';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    private readonly config;
    constructor(authService: AuthService, config: ConfigService);
    register(dto: RegisterDto, res: Response, registerApiKey: string | undefined, requester?: AuthenticatedUser): Promise<{
        accessToken: string;
        expiresIn: string;
        tokenType: "Bearer";
        user: import("./auth.service").SafeUser;
    }>;
    login(dto: LoginDto, req: Request, res: Response): Promise<{
        accessToken: string;
        expiresIn: string;
        tokenType: "Bearer";
        user: import("./auth.service").SafeUser;
    }>;
    refresh(req: Request, res: Response): Promise<{
        accessToken: string;
        expiresIn: string;
        tokenType: "Bearer";
        user: import("./auth.service").SafeUser;
    }>;
    clearSession(res: Response): void;
    logout(req: Request, res: Response): Promise<void>;
    logoutAll(user: AuthenticatedUser): Promise<void>;
    me(user: AuthenticatedUser): Promise<import("./auth.service").SafeUser>;
    adminPing(): {
        ok: boolean;
        scope: string;
    };
    private assertValidRegisterApiKey;
    private setRefreshCookie;
    private clearRefreshCookie;
    private getRefreshTokenFromRequest;
    private extractMeta;
    private resolveClientIp;
}
