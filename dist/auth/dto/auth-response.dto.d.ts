import { SafeUserDto } from './safe-user.dto';
export declare class AuthResponseDto {
    accessToken: string;
    expiresIn: string;
    tokenType: 'Bearer';
    user: SafeUserDto;
}
