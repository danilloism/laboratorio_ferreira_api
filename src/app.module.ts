import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContatoModule } from './contato/contato.module';
import { ServicoModule } from './servico/servico.module';
import { ProdutoModule } from './produto/produto.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      entities: [`${__dirname}/**/*.entity{.ts,.js}`],
      synchronize: true,
      database: 'lab_ferreira',
    }),
    ContatoModule,
    ServicoModule,
    ProdutoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
