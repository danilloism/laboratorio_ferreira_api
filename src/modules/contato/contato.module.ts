import { Module } from '@nestjs/common';
import { ContatoService } from './service/contato.service';
import { ContatoController } from './controller/contato.controller';

@Module({
  controllers: [ContatoController],
  providers: [ContatoService],
})
export class ContatoModule {}
