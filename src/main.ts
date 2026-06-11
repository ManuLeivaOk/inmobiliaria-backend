import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { setupSwagger } from './swagger/setup-swagger';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(bodyParser.json({ limit: '25mb' }));
  app.use(bodyParser.urlencoded({ limit: '25mb', extended: true }));

  const config = app.get(ConfigService);

  const isProduction = config.get<string>('nodeEnv') === 'production';

  if (isProduction) {
    app.set('trust proxy', 1);
  }

  app.setGlobalPrefix('api');

  app.use(
    helmet({
      contentSecurityPolicy: isProduction ? undefined : false,
    }),
  );

  app.use(cookieParser());

  app.enableCors({
    // Permite tu front (asegurate que apunte a http://localhost:3001)
    origin: config.get<string>('cors.origin') ?? 'http://localhost:3001',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    // 🛡️ Agregamos cabeceras estándar que a veces el navegador inyecta al pedir imágenes
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Range'],
    // 👁️ Súper importante: expone las cabeceras para que el navegador no sospeche del recurso cruzado
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  if (!isProduction) {
    setupSwagger(app);
  }

  const port = config.get<number>('port') ?? 3000;

  await app.listen(port);

  if (!isProduction) {
    console.log(`Swagger UI: http://localhost:${port}/api/docs`);
  }

  console.log(`Uploads: http://localhost:${port}/uploads`);
}

bootstrap();
