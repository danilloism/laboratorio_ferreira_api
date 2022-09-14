import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import * as express from 'express';
import * as functions from 'firebase-functions';
import helmet from 'helmet';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './src/app.module';
import { HttpExceptionFilter } from './src/modules/common/filters/http-exception.filter';
import { PrismaService } from './src/modules/data/services/prisma.service';

const expressServer = express();
const createFunction = async (expressInstance): Promise<void> => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.use(helmet());
  app.enableCors();
  app.use(compression());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      enableDebugMessages: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Laboratório Ferreira API')
    .setDescription('API RESTful do sistema Laboratório Ferreira.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'Documentação da API RESTful do Laboratório Ferreira.',
  });

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  await app.init();
};

export const api = functions
  .region('southamerica-east1')
  .runWith({
    secrets: [
      'DATABASE_URL',
      'SALT_KEY',
      'UUID_NAME',
      'UUID_NAMESPACE',
      'JWT_SECRET',
    ],
  })
  .https.onRequest(async (request, response) => {
    await createFunction(expressServer);
    expressServer(request, response);
  });
