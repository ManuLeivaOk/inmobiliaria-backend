import { UserRole } from '../../users/enums/user-role.enum';
export declare class RegisterDto {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    password: string;
    role?: UserRole;
}
