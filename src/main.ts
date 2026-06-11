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
    // 👥 Array con todos los orígenes permitidos (IP actual y dominios futuros)
    origin: [
      'http://localhost:3001',
      'http://200.58.96.221:3002',
      'http://continentalpropiedades.site',
      'https://continentalpropiedades.site' // Agregalo también con HTTPS para cuando le pongas el certificado SSL
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Range'],
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
