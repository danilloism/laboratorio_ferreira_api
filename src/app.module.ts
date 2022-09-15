import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import * as Joi from 'joi';
import { utilities as NestWinstonUtilities, WinstonModule } from 'nest-winston';
import * as Winston from 'winston';
import databaseConfig from './config/database.config';
import encryptionConfig from './config/encryption.config';
import nodeConfig from './config/node.config';
import { AgendaModule } from './modules/agenda/agenda.module';
import { AuthModule, JwtAuthGuard } from './modules/auth';
// import { ChatModule } from './modules/chat/chat.module';
import { CommonModule } from './modules/common/common.module';
import { HttpExceptionFilter } from './modules/common/filters/http-exception.filter';
import { EstoqueModule } from './modules/estoque/estoque.module';
import { FinanceiroModule } from './modules/financeiro/financeiro.module';
import { HealthModule } from './modules/health/health.module';
import { MailModule } from './modules/mail/mail.module';
import { ServicoModule } from './modules/servico/servico.module';
import { NodeEnvironment } from './types';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [encryptionConfig, nodeConfig, databaseConfig],
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().uri().required(),
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development'),
        JWT_SECRET: Joi.string().required(),
        UUID_NAME: Joi.string().required(),
        UUID_NAMESPACE: Joi.string().uuid().required(),
        SALT_KEY: Joi.number().required(),
        PORT: Joi.number().default(3000),
        HOST: Joi.string().uri(),
      }),
    }),
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const nodeEnv = config.get<NodeEnvironment>('node.env');

        return {
          transports: [
            new Winston.transports.Console({
              level: 'silly',
              handleExceptions: true,
              handleRejections: true,
              format:
                nodeEnv == 'development'
                  ? Winston.format.combine(
                      Winston.format.ms(),
                      Winston.format.colorize({ all: true }),
                      NestWinstonUtilities.format.nestLike('Servidor'),
                      Winston.format.timestamp(),
                    )
                  : Winston.format.json(),
            }),
          ],
        };
      },
    }),
    CommonModule,
    HealthModule,
    AuthModule,
    AgendaModule,
    EstoqueModule,
    ServicoModule,
    FinanceiroModule,
    MailModule,
    // ChatModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
