import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ACCESS_TOKEN_STRATEGY } from '../../auth/auth.constants';
import { AuthenticatedUser } from '../interfaces/authenticated-user.interface';

@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard(ACCESS_TOKEN_STRATEGY) {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<{
      headers: { authorization?: string };
    }>();

    const authHeader = request.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest<TUser = AuthenticatedUser>(
    err: Error | null,
    user: TUser | false,
  ): TUser | undefined {
    if (err || !user) {
      return undefined;
    }
    return user;
  }
}
