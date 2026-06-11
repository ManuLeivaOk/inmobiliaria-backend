import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { UserRole } from './enums/user-role.enum';
import { User } from './entities/user.entity';
export interface CreateUserInput {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    password: string;
    role?: UserRole;
}
export declare class UsersService {
    private readonly usersRepo;
    private readonly config;
    constructor(usersRepo: Repository<User>, config: ConfigService);
    findActiveById(id: string): Promise<User | null>;
    findByEmailWithPassword(email: string): Promise<User | null>;
    create(input: CreateUserInput): Promise<User>;
    verifyPassword(user: User, plainPassword: string): Promise<boolean>;
    updateLastLogin(userId: string): Promise<void>;
    getProfile(userId: string): Promise<User>;
    private hashPassword;
    private applyPepper;
}
