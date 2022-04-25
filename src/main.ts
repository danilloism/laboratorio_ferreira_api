import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaService } from './modules/sistema/prisma';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { utilities as WinstonUtilities, WinstonModule } from 'nest-winston';
import * as Winston from 'winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      level: 'silly',
      handleRejections: true,
      handleExceptions: true,
      format: Winston.format.combine(
        Winston.format.cli({ all: true, level: true }),
        Winston.format.timestamp({ format: 'DD/MM/YYYY hh:mm:ss.SSS A' }),
        Winston.format.ms(),
        Winston.format.align(),
        WinstonUtilities.format.nestLike('Laboratório Ferreira API', {
          prettyPrint: true,
        }),
        Winston.format.colorize({
          colors: {
            error: 'red',
            warn: 'yellow',
            http: 'orange',
            info: 'blue',
            verbose: 'purple',
            debug: 'green',
            silly: 'pink',
          },
        }),
      ),
      transports: [new Winston.transports.Console()],
    }),
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      enableDebugMessages: true,
      validationError: { target: true, value: true },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Laboratório Ferreira API')
    .setDescription('API RESTful do sistema Laboratório Ferreira.')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const prisma = app.get(PrismaService);
  prisma.enableShutdownHooks(app);

  await app.listen(process.env.PORT || 3000, () => {
    const logger = new Logger('Servidor');
    logger.log('Servidor iniciado');
  });
}
bootstrap();
