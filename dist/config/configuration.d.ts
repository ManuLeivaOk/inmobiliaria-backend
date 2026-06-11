declare const _default: () => {
    nodeEnv: string;
    port: number;
    database: {
        host: string;
        port: number;
        username: string;
        password: string;
        name: string;
        ssl: boolean;
        synchronize: boolean;
        dropSchema: boolean;
        seedOnStartup: boolean;
    };
    jwt: {
        accessSecret: string | undefined;
        refreshSecret: string | undefined;
        accessExpiresIn: string;
        refreshExpiresIn: string;
        issuer: string;
        audience: string;
    };
    auth: {
        registerApiKey: string | undefined;
        refreshCookieName: string;
        bcryptPepper: string;
        cookieSecure: boolean | undefined;
        cookieSameSite: "strict" | "lax" | "none";
        cookieDomain: string | undefined;
        requireEmailVerified: boolean;
    };
    cors: {
        origin: string;
    };
};
export default _default;
