"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = setupSwagger;
const config_1 = require("@nestjs/config");
const swagger_1 = require("@nestjs/swagger");
const auth_module_1 = require("../auth/auth.module");
const amenities_module_1 = require("../amenities/amenities.module");
const geo_module_1 = require("../geo/geo.module");
const properties_module_1 = require("../properties/properties.module");
const swagger_constants_1 = require("./swagger.constants");
function setupSwagger(app) {
    const config = app.get(config_1.ConfigService);
    const port = config.get('port') ?? 3000;
    const document = new swagger_1.DocumentBuilder()
        .setTitle('API Inmobiliaria')
        .setDescription(`API de autenticación y autorización para la plataforma inmobiliaria.

## Tokens
- **Access token (JWT)**: enviar en \`Authorization: Bearer <token>\`. Vida corta (~15 min).
- **Refresh token**: cookie \`httpOnly\` \`${swagger_constants_1.SWAGGER_REFRESH_COOKIE}\`. No usar localStorage.

## Probar en Swagger UI
1. Ejecutá **POST /auth/login** o **POST /auth/register**.
2. Copiá \`accessToken\` de la respuesta y usá **Authorize** (Bearer).
3. Para **POST /auth/refresh**, activá también la cookie en **Authorize** → refresh_token, o probá desde el navegador con sesión iniciada (\`withCredentials\`).

Base URL: \`http://localhost:${port}/api\``)
        .setVersion('1.0.0')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Access token obtenido en login o register',
    }, swagger_constants_1.SWAGGER_ACCESS_TOKEN)
        .addCookieAuth(swagger_constants_1.SWAGGER_REFRESH_COOKIE, {
        type: 'apiKey',
        in: 'cookie',
        name: swagger_constants_1.SWAGGER_REFRESH_COOKIE,
        description: 'Refresh token opaco (se setea automáticamente en login/register/refresh)',
    })
        .addTag('Autenticación', 'Registro, login, refresh y sesiones')
        .addTag('Propiedades', 'ABM de propiedades inmobiliarias')
        .addTag('Amenities', 'Catálogo de amenities')
        .addTag('Geografía', 'Países, provincias, ciudades y barrios')
        .build();
    const swaggerDocument = swagger_1.SwaggerModule.createDocument(app, document, {
        include: [auth_module_1.AuthModule, properties_module_1.PropertiesModule, amenities_module_1.AmenitiesModule, geo_module_1.GeoModule],
        operationIdFactory: (_controllerKey, methodKey) => methodKey,
    });
    swagger_1.SwaggerModule.setup('api/docs', app, swaggerDocument, {
        customSiteTitle: 'Inmobiliaria — API Docs',
        swaggerOptions: {
            persistAuthorization: true,
            withCredentials: true,
            tagsSorter: 'alpha',
            operationsSorter: 'alpha',
        },
    });
}
//# sourceMappingURL=setup-swagger.js.map