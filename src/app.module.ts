import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { TerminusModule } from '@nestjs/terminus';
import { utilities as NestWinstonUtilities, WinstonModule } from 'nest-winston';
import * as Winston from 'winston';
import { AppController } from './app.controller';
import { AgendaModule } from './modules/agenda/agenda.module';
import { AuthModule, JwtAuthGuard } from './modules/auth';
import { HttpExceptionFilter } from './modules/common/filters/http-exception.filter';
import { DataModule } from './modules/data/data.module';
import { EstoqueModule } from './modules/estoque/estoque.module';
import { FinanceiroModule } from './modules/financeiro/financeiro.module';
import { ServicoModule } from './modules/servico/servico.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    WinstonModule.forRoot({
      transports: [
        new Winston.transports.Console({
          level: 'silly',
          handleExceptions: true,
          handleRejections: true,
          format:
            process.env.NODE_ENV == 'development'
              ? Winston.format.combine(
                  Winston.format.ms(),
                  Winston.format.colorize({ all: true }),
                  NestWinstonUtilities.format.nestLike('Servidor'),
                  Winston.format.timestamp(),
                )
              : Winston.format.json(),
        }),
      ],
    }),
    DataModule,
    TerminusModule,
    HttpModule,
    AuthModule,
    AgendaModule,
    EstoqueModule,
    ServicoModule,
    FinanceiroModule,
  ],
  controllers: [AppController],
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
