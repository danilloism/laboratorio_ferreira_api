import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      entities: [`$__dirname/**/*.entity{.ts,.js}`],
      synchronize: true,
      database: 'lab_ferreira',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
