import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ACCESS_TOKEN_STRATEGY } from '../auth.constants';
import { AccessTokenPayload } from '../../common/interfaces/jwt-payload.interface';
import { AuthenticatedUser } from '../../common/interfaces/authenticated-user.interface';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  ACCESS_TOKEN_STRATEGY,
) {
  constructor(
    config: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.getOrThrow<string>('jwt.accessSecret'),
      issuer: config.get<string>('jwt.issuer'),
      audience: config.get<string>('jwt.audience'),
    });
  }

  async validate(payload: AccessTokenPayload): Promise<AuthenticatedUser> {
    if (payload.type !== 'access') {
      throw new UnauthorizedException('Token inválido');
    }

    const user = await this.usersService.findActiveById(payload.sub);

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }
}
