import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AgendaModule } from './modules/agenda/agenda.module';
import { OperacionalModule } from './modules/operacional/operacional.module';
import { JwtAuthGuard } from './modules/sistema/auth';
import { SistemaModule } from './modules/sistema/sistema.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      logNotifications: true,
      logger: 'debug',
      synchronize: true,
    }),
    SistemaModule,
    AgendaModule,
    OperacionalModule,
  ],
  controllers: [],
  providers: [Logger, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
