import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { AccessTokenPayload } from '../../common/interfaces/jwt-payload.interface';
import { AuthenticatedUser } from '../../common/interfaces/authenticated-user.interface';
import { UsersService } from '../../users/users.service';
declare const JwtAccessStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtAccessStrategy extends JwtAccessStrategy_base {
    private readonly usersService;
    constructor(config: ConfigService, usersService: UsersService);
    validate(payload: AccessTokenPayload): Promise<AuthenticatedUser>;
}
export {};
