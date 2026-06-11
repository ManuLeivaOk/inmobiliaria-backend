import { ExecutionContext } from '@nestjs/common';
import { AuthenticatedUser } from '../interfaces/authenticated-user.interface';
declare const OptionalJwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class OptionalJwtAuthGuard extends OptionalJwtAuthGuard_base {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | import("rxjs").Observable<boolean>;
    handleRequest<TUser = AuthenticatedUser>(err: Error | null, user: TUser | false): TUser | undefined;
}
export {};
