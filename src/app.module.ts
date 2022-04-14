import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContatoModule } from './contato/contato.module';

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
    }),
    ContatoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
