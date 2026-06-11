export default () => ({
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: parseInt(process.env.PORT ?? '3000', 10),
  database: {
    host: process.env.DB_HOST ?? 'localhost',
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    username: process.env.DB_USERNAME ?? 'postgres',
    password: process.env.DB_PASSWORD ?? 'postgres',
    name: process.env.DB_NAME ?? 'inmobiliaria',
    ssl: process.env.DB_SSL === 'true',
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    dropSchema: process.env.DB_DROP_SCHEMA === 'true',
    seedOnStartup: process.env.DB_SEED === 'true',
  },
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? '15m',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? '7d',
    issuer: process.env.JWT_ISSUER ?? 'inmobiliaria-api',
    audience: process.env.JWT_AUDIENCE ?? 'inmobiliaria-web',
  },
  auth: {
    registerApiKey: process.env.REGISTER_API_KEY,
    refreshCookieName: process.env.REFRESH_COOKIE_NAME ?? 'refresh_token',
    bcryptPepper: process.env.PASSWORD_PEPPER ?? '',
    cookieSecure:
      process.env.COOKIE_SECURE === undefined
        ? undefined
        : process.env.COOKIE_SECURE === 'true',
    cookieSameSite:
      (process.env.COOKIE_SAME_SITE as 'strict' | 'lax' | 'none') ?? 'strict',
    cookieDomain: process.env.COOKIE_DOMAIN,
    requireEmailVerified: process.env.REQUIRE_EMAIL_VERIFIED === 'true',
  },
  cors: {
    origin: process.env.CORS_ORIGIN ?? 'http://localhost:3001',
  },
});
