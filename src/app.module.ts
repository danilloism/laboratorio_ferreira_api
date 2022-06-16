import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AgendaModule } from './modules/agenda/agenda.module';
import { EstoqueModule } from './modules/estoque/estoque.module';
import { JwtAuthGuard, AuthModule } from './modules/auth';
import { ServicoModule } from './modules/servico/servico.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { FinanceiroModule } from './modules/financeiro/financeiro.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      logNotifications: true,
      logger: 'debug',
      synchronize: true,
      applicationName: 'lab-ferreira-api',
      namingStrategy: new SnakeNamingStrategy(),
    }),
    AuthModule,
    AgendaModule,
    EstoqueModule,
    ServicoModule,
    FinanceiroModule,
  ],
  controllers: [AppController],
  providers: [Logger, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
