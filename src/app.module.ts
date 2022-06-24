import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AgendaModule } from './modules/agenda/agenda.module';
import { EstoqueModule } from './modules/estoque/estoque.module';
import { JwtAuthGuard, AuthModule } from './modules/auth';
import { ServicoModule } from './modules/servico/servico.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { FinanceiroModule } from './modules/financeiro/financeiro.module';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { dbConfig } from './config/db.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    TerminusModule,
    HttpModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (): Promise<TypeOrmModuleOptions> => dbConfig(),
    }),
    // TypeOrmModule.forRoot(dbConfig),
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
