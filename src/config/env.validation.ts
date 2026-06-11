import { plainToInstance } from 'class-transformer';
import {
  IsBooleanString,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  validateSync,
} from 'class-validator';

class EnvironmentVariables {
  @IsOptional()
  @IsIn(['development', 'production', 'test'])
  NODE_ENV?: string;

  @IsOptional()
  PORT?: string;

  @IsString()
  @IsNotEmpty()
  DB_HOST!: string;

  @IsString()
  @IsNotEmpty()
  DB_PORT!: string;

  @IsString()
  @IsNotEmpty()
  DB_USERNAME!: string;

  @IsString()
  @IsNotEmpty()
  DB_PASSWORD!: string;

  @IsString()
  @IsNotEmpty()
  DB_NAME!: string;

  @IsOptional()
  @IsBooleanString()
  DB_SSL?: string;

  @IsOptional()
  @IsBooleanString()
  DB_SYNCHRONIZE?: string;

  @IsOptional()
  @IsBooleanString()
  DB_DROP_SCHEMA?: string;

  @IsOptional()
  @IsBooleanString()
  DB_SEED?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(32)
  JWT_ACCESS_SECRET!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(32)
  JWT_REFRESH_SECRET!: string;

  @IsOptional()
  JWT_ACCESS_EXPIRES_IN?: string;

  @IsOptional()
  JWT_REFRESH_EXPIRES_IN?: string;

  @IsOptional()
  JWT_ISSUER?: string;

  @IsOptional()
  JWT_AUDIENCE?: string;

  @IsOptional()
  PASSWORD_PEPPER?: string;

  @IsOptional()
  @MinLength(32)
  REGISTER_API_KEY?: string;

  @IsOptional()
  REFRESH_COOKIE_NAME?: string;

  @IsOptional()
  @IsBooleanString()
  COOKIE_SECURE?: string;

  @IsOptional()
  @IsIn(['strict', 'lax', 'none'])
  COOKIE_SAME_SITE?: string;

  @IsOptional()
  COOKIE_DOMAIN?: string;

  @IsOptional()
  CORS_ORIGIN?: string;

  @IsOptional()
  @IsBooleanString()
  REQUIRE_EMAIL_VERIFIED?: string;
}

export function validateEnv(config: Record<string, unknown>) {
  const validated = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validated, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(
      `Variables de entorno inválidas:\n${errors
        .map((e) => Object.values(e.constraints ?? {}).join(', '))
        .join('\n')}`,
    );
  }

  if (
    validated.JWT_ACCESS_SECRET &&
    validated.JWT_REFRESH_SECRET &&
    validated.JWT_ACCESS_SECRET === validated.JWT_REFRESH_SECRET
  ) {
    throw new Error(
      'Variables de entorno inválidas:\nJWT_ACCESS_SECRET y JWT_REFRESH_SECRET deben ser distintos',
    );
  }

  return validated;
}
