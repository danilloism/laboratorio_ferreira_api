import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaService } from './modules/sistema/prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      enableDebugMessages: true,
      validationError: { target: true, value: true },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Laboratório Ferreira API')
    .setDescription('API RESTful do sistema Laboratório Ferreira.')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    customSiteTitle: 'Documentação da API RESTful do Laboratório Ferreira.',
  });

  const prisma = app.get(PrismaService);
  prisma.enableShutdownHooks(app);

  await app.listen(process.env.PORT || 3000, () => {
    const logger = new Logger('Servidor');
    logger.log('Servidor iniciado');
  });
}
bootstrap();
