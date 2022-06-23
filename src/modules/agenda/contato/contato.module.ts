import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContatoController } from './controller/contato.controller';
import { Account } from './entities/account.entity';
import { Contato } from './entities/contato.entity';
import { ContatoService } from './service/contato.service';

@Module({
  imports: [TypeOrmModule.forFeature([Contato, Account])],
  controllers: [ContatoController],
  providers: [ContatoService],
  exports: [ContatoService],
})
export class ContatoModule {}
