import { UserRole } from '../../users/enums/user-role.enum';
export declare class SafeUserDto {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
    role: UserRole;
    isVerified: boolean;
}
