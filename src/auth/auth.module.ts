import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RefreshToken } from './entities/refresh-token.entity';
import { OptionalJwtAuthGuard } from '../common/guards/optional-jwt-auth.guard';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { TokenService } from './token.service';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt-access' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        signOptions: {
          issuer: config.get<string>('jwt.issuer'),
          audience: config.get<string>('jwt.audience'),
        },
      }),
    }),
    TypeOrmModule.forFeature([RefreshToken, User]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    TokenService,
    JwtAccessStrategy,
    OptionalJwtAuthGuard,
  ],
  exports: [AuthService, TokenService],
})
export class AuthModule {}
