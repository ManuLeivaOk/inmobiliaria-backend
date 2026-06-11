declare class EnvironmentVariables {
    NODE_ENV?: string;
    PORT?: string;
    DB_HOST: string;
    DB_PORT: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    DB_SSL?: string;
    DB_SYNCHRONIZE?: string;
    DB_DROP_SCHEMA?: string;
    DB_SEED?: string;
    JWT_ACCESS_SECRET: string;
    JWT_REFRESH_SECRET: string;
    JWT_ACCESS_EXPIRES_IN?: string;
    JWT_REFRESH_EXPIRES_IN?: string;
    JWT_ISSUER?: string;
    JWT_AUDIENCE?: string;
    PASSWORD_PEPPER?: string;
    REGISTER_API_KEY?: string;
    REFRESH_COOKIE_NAME?: string;
    COOKIE_SECURE?: string;
    COOKIE_SAME_SITE?: string;
    COOKIE_DOMAIN?: string;
    CORS_ORIGIN?: string;
    REQUIRE_EMAIL_VERIFIED?: string;
}
export declare function validateEnv(config: Record<string, unknown>): EnvironmentVariables;
export {};
