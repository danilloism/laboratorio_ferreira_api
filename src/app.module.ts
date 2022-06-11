import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AgendaModule } from './modules/agenda/agenda.module';
import { EstoqueModule } from './modules/estoque/estoque.module';
import { JwtAuthGuard } from './modules/auth';
import { AuthModule } from './modules/auth/auth.module';

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
      autoLoadEntities: true,
      logNotifications: true,
      logger: 'debug',
      synchronize: true,
      applicationName: 'lab-ferreira-api',
    }),
    AuthModule,
    AgendaModule,
    EstoqueModule,
  ],
  controllers: [AppController],
  providers: [Logger, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
