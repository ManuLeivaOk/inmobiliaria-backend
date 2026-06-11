import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthModule } from '../auth/auth.module';
import { AmenitiesModule } from '../amenities/amenities.module';
import { GeoModule } from '../geo/geo.module';
import { PropertiesModule } from '../properties/properties.module';
import {
  SWAGGER_ACCESS_TOKEN,
  SWAGGER_REFRESH_COOKIE,
} from './swagger.constants';

export function setupSwagger(app: INestApplication): void {
  const config = app.get(ConfigService);
  const port = config.get<number>('port') ?? 3000;

  const document = new DocumentBuilder()
    .setTitle('API Inmobiliaria')
    .setDescription(
      `API de autenticación y autorización para la plataforma inmobiliaria.

## Tokens
- **Access token (JWT)**: enviar en \`Authorization: Bearer <token>\`. Vida corta (~15 min).
- **Refresh token**: cookie \`httpOnly\` \`${SWAGGER_REFRESH_COOKIE}\`. No usar localStorage.

## Probar en Swagger UI
1. Ejecutá **POST /auth/login** o **POST /auth/register**.
2. Copiá \`accessToken\` de la respuesta y usá **Authorize** (Bearer).
3. Para **POST /auth/refresh**, activá también la cookie en **Authorize** → refresh_token, o probá desde el navegador con sesión iniciada (\`withCredentials\`).

Base URL: \`http://localhost:${port}/api\``,
    )
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Access token obtenido en login o register',
      },
      SWAGGER_ACCESS_TOKEN,
    )
    .addCookieAuth(SWAGGER_REFRESH_COOKIE, {
      type: 'apiKey',
      in: 'cookie',
      name: SWAGGER_REFRESH_COOKIE,
      description:
        'Refresh token opaco (se setea automáticamente en login/register/refresh)',
    })
    .addTag('Autenticación', 'Registro, login, refresh y sesiones')
    .addTag('Propiedades', 'ABM de propiedades inmobiliarias')
    .addTag('Amenities', 'Catálogo de amenities')
    .addTag('Geografía', 'Países, provincias, ciudades y barrios')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, document, {
    include: [AuthModule, PropertiesModule, AmenitiesModule, GeoModule],
    operationIdFactory: (_controllerKey, methodKey) => methodKey,
  });

  SwaggerModule.setup('api/docs', app, swaggerDocument, {
    customSiteTitle: 'Inmobiliaria — API Docs',
    swaggerOptions: {
      persistAuthorization: true,
      withCredentials: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });
}
