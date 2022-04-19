import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies/snake-naming.strategy';
import { AgendaModule } from './agenda/agenda.module';
import { EstoqueModule } from './estoque/estoque.module';
import { PrestacaoDeServicoModule } from './prestacao-de-servico/prestacao-de-servico.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      applicationName: 'lab_ferreira_api',
      entities: [`${__dirname}/**/*.entity{.ts,.js}`],
      synchronize: true,
      database: 'lab_ferreira',
      username: 'danilloism',
      password: 'senhatemp123',
      autoLoadEntities: true,
      logNotifications: true,
      verboseRetryLog: true,
      logger: 'simple-console',
      namingStrategy: new SnakeNamingStrategy(),
    }),
    AgendaModule,
    EstoqueModule,
    PrestacaoDeServicoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
