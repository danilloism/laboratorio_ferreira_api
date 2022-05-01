import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaService } from './modules/sistema/prisma/prisma.service';
import * as compression from 'compression';
import * as fs from 'fs';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(compression());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      enableDebugMessages: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Laboratório Ferreira API')
    .setDescription('API RESTful do sistema Laboratório Ferreira.')
    .setVersion('1.0')
    .build();

  const document =
    process.env.NODE_ENV == 'development'
      ? SwaggerModule.createDocument(app, config)
      : JSON.parse(fs.readFileSync('./doc/api.doc.json').toString());
  SwaggerModule.setup('api-docs', app, document, {
    customSiteTitle: 'Documentação da API RESTful do Laboratório Ferreira.',
  });

  const prisma = app.get(PrismaService);
  prisma.enableShutdownHooks(app);

  await app.listen(process.env.PORT || 10000, () => {
    const logger = new Logger('Servidor');
    logger.log(`Servidor iniciado na porta: ${app.getHttpServer()}`);

    if (process.env.NODE_ENV == 'development') {
      fs.writeFileSync('./doc/api.doc.json', JSON.stringify(document));
    }
  });
}
bootstrap();
