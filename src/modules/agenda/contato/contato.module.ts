import { Module } from '@nestjs/common';
import { ContatoController } from './controller/contato.controller';
import { ContatoService } from './service/contato.service';

@Module({
  controllers: [ContatoController],
  providers: [ContatoService],
  exports: [ContatoService],
})
export class ContatoModule {}
